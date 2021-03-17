const { assignDefaults } = require('./_utils')

module.exports = function claveUnica(strategy) {
  assignDefaults(strategy, {
    _scheme: 'claveUnica',
    redirectLogin: { url: '/api/auth/url', method: 'get' },
    login: { url: '/api/auth/login', method: 'post' },
    refresh: { url: '/api//auth/login/refresh', method: 'post' },
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
