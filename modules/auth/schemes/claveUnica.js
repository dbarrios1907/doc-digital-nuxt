import { getMatchedComponents, normalizePath, routeOption } from '~/shared/utils/router'
import jwt_decode from 'jwt-decode'
import get from 'lodash.get'
import { mapLoginUrl } from '~/shared/mappers/login.mappers'
import { isAuthErrorResponse, isValidResponse, tokenExpiredError } from '~/shared/utils/request'

// const isHttps = process.server ? require('is-https') : null

export default class ClaveUnicaScheme {
  _redirectURI = null

  constructor(auth, options) {
    this.$auth = auth
    this.req = auth.ctx.req
    this.name = options._name

    this.options = Object.assign({}, options)
  }

  async redirectURI() {
    const { url, method } = this.options.redirectLogin

    const resp = await this.$auth.request({
      method,
      url,
      baseURL: process.server ? undefined : false,
    })
    return mapLoginUrl(resp)
  }

  async login() {
    if (!this._redirectURI) {
      this._redirectURI = await this.redirectURI()
    }

    if (!this._redirectURI) return this.$auth.callOnError('Could not fetch authorization URI')
    window.location.replace(this._redirectURI)
    // this.$auth.redirect(this._redirectURI, true)
  }

  async refreshToken(retry) {
    if (this.$auth.$storage.getState('attemptTokenRefresh')) {
      return Promise.reject()
    }

    const { url, method } = this.options.refresh
    this.$auth.$storage.setState('attemptTokenRefresh', true)

    const resp = await this.$auth.requestWith(this.name, {
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
      },
      baseURL: process.server ? undefined : false,
    })

    const [valid] = isValidResponse(resp)

    if (valid) {
      await this.validateAndPersistToken(resp)
      return retry()
    }

    await this.reset()
    return Promise.reject()
  }

  async logout(idle) {
    const { url, method } = this.options.logout
    let resp = null
    try {
      resp = await this.$auth.requestWith(this.name, {
        method,
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        baseURL: process.server ? undefined : false,
      })
      // eslint-disable-next-line no-empty
    } catch (err) {}

    const [valid, Toast] = isValidResponse(resp)

    if (!valid) {
      return Toast.error({
        message: 'Ocurrió un error inesperado, no se pudo desloguear al usuario',
      })
    }
    await this.reset()
    this.$auth.$storage.setUniversal('route.message', null)
    idle ? this.$auth.ctx.store.dispatch('session/expireSession') : this.$auth.ctx.store.dispatch('session/closeSession')
  }

  async mounted() {
    // Handle callback only for specified route
    if (normalizePath(this.$auth.ctx.route.path) === normalizePath(this.$auth.options.redirect.login)) return

    // Handle callbacks on page load
    const redirected = await this._handleCallback()
    if (!redirected) await this.$auth.fetchUserOnce()

    // verify user access
    await this.authMiddleware()
  }

  setUserToken(token = null) {
    let _token = token
    // get token data before setting token type
    const userData = jwt_decode(token)

    // Append token_type
    if (this.options.token_type) {
      _token = this.options.token_type + ' ' + token
    }

    // Store refresh token
    // if (refreshToken && refreshToken.length) {
    //   refreshToken = this.options.token_type + ' ' + refreshToken
    //   this.$auth.setRefreshToken(this.name, refreshToken)
    // }

    this.$auth.setUser(userData)
    this.$auth.ctx.store.dispatch('updateUserAccess', userData)

    // Store token
    this.$auth.setToken(this.name, token)

    // Set Authorization token for all axios requests
    this.$auth.ctx.app.$axios.setHeader(this.options.tokenName, _token)
  }

  getToken() {
    // Set Authorization token for all axios requests
    let _token = this.$auth.getToken(this.name)
    if (this.options.token_type) {
      _token = this.options.token_type + ' ' + _token
    }
    return _token
  }

  async reset() {
    this.$auth.setUser(false)
    this.$auth.setToken(this.name, false)
    this.$auth.ctx.app.$axios.setHeader(this.options.tokenName, false)
    this.$auth.$storage.setUniversal(this.name + '.state', null)
    return Promise.resolve()
  }

  async authMiddleware() {
    // Disable middleware if options: { auth: false } is set on the route
    if (routeOption(this.$auth.ctx.route, 'auth', false)) {
      return true
    }

    // Disable middleware if no route was matched to allow 404/error page
    const matches = []
    const Components = getMatchedComponents(this.$auth.ctx.route, matches)
    if (!Components.length) {
      return true
    }

    const { login, callback } = this.$auth.options.redirect
    const pageIsInGuestMode = routeOption(this.$auth.ctx.route, 'auth', 'guest')
    const insidePage = page => normalizePath(this.$auth.ctx.route.path) === normalizePath(page)

    if (!this.$auth.$state.loggedIn) {
      // -- Guest --
      // (Those passing `callback` at runtime need to mark their callback component
      // with `auth: false` to avoid an unnecessary redirect from callback to login)
      if (!pageIsInGuestMode && (!callback || !insidePage(callback))) {
        await this.reset()
        this.$auth.redirect('unauthorized', true)
        return false
      }
    }

    return true
  }

  async fetchUser() {
    const token = this.$auth.getToken(this.name)

    if (!token || !token.length) {
      await this.reset()
      this.$auth.redirect('unauthorized', true)
    }

    this.setUserToken(token)
  }

  async validateAndPersistToken(resp, data) {
    let token = get(resp, `result.${this.options.token_key}`, null)
    this.options.expires = get(resp, `result.expires_in`, 3000)

    if (!token || !token.length) {
      // if token is null try to use persisted token
      // only if resp for token request still valid
      if (resp.status === 200 && resp.count === 1) {
        token = this.$auth.getToken(this.name)
      } else {
        await this.reset()
        this.$auth.redirect('unauthorized', true)
      }
    }

    // if valid token save state params and userToken
    if (data) this.$auth.$storage.setUniversal(this.name + '.state', data)
    this.setUserToken(token)
  }

  // eslint-disable-next-line max-statements
  async _handleCallback(uri) {
    if (normalizePath(this.$auth.ctx.route.path) !== normalizePath(this.$auth.options.redirect.callback)) return

    // Callback flow is not supported in server side
    if (process.server) {
      return
    }

    const parsedQuery = Object.assign({}, this.$auth.ctx.route.query)

    // Validate state
    const state = this.$auth.$storage.getUniversal(this.name + '.state')
    this.$auth.$storage.setUniversal(this.name + '.state', null)

    const { url, method } = this.options.login

    // -- Authorization Code Grant --
    if (!parsedQuery.code || !parsedQuery.state) return this.$auth.callOnError('callback executed with empty or invalid parameters')
    const data = {
      code: parsedQuery.code,
      state: parsedQuery.state,
    }

    const resp = await this.$auth.request({
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
      },
      baseURL: process.server ? undefined : false,
      data,
    })
    await this.validateAndPersistToken(resp, data)
    this.$auth.$storage.setUniversal('pendingEntityLogin', true)
    // Redirect to home
    this.$auth.redirect('home', true)
    return true // True means a redirect happened
  }

  async loginWithEntity(userId) {
    const resp = await this.$auth.requestWith(this.name, this.options.loginWithEntity(userId))
    await this.validateAndPersistToken(resp)
    this.$auth.$storage.setUniversal('pendingEntityLogin', false)
    // Redirect to home
    this.$auth.redirect('home', true)
  }

  async handleErrorResponse(resp, retry) {
    if (tokenExpiredError(resp)) {
      return this.refreshToken(retry)
    }
    const message = resp?.error
    this.$auth.$storage.setUniversal('route.message', message)

    if (isAuthErrorResponse(resp)) {
      await this.reset()
    }
    return Promise.reject(resp)
  }
}
