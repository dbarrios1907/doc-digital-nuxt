const { assignDefaults } = require('./_utils')

module.exports = function claveUnica(strategy) {
  assignDefaults(strategy, {
    _scheme: 'claveUnica',
    genericErrorMessage: 'Lo sentimos, hemos tenido un problema',
    redirectLogin: { url: process.env.FETCH_AUTH_URL, method: 'get' },
    login: { url: process.env.LOGIN_URL, method: 'post' },
    refresh: { url: '/api/auth/login/refresh', method: 'get' },
    logout: { url: '/api/auth/logout', method: 'post' },
    unauthorizedPath: '/401',
    tokenName: 'Authorization',
    token_key: 'token',
    code_key: 'code',
    state_key: 'state',
    token_type: 'Bearer',
    response_type: 'code',
    refreshToken: {
      property: 'refresh_token',
      data: 'refresh_token',
    },
    scope: '*',
  })
}
