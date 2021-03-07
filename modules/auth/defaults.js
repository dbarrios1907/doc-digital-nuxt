export default {
  //  -- Error handling --

  resetOnError: false,

  // -- Authorization --

  scopeKey: 'scope',

  // -- Redirects --

  rewriteRedirects: true,

  fullPathRedirect: false,

  watchLoggedIn: true,

  redirect: {
    login: '/login',
    logout: '/',
    home: '/',
    callback: '/callback',
  },

  //  -- Vuex Store --

  vuex: {
    namespace: 'auth',
  },

  // -- Cookie Store --

  cookie: {
    prefix: 'auth.',
    options: {
      path: '/',
    },
  },

  // -- localStorage Store --

  localStorage: {
    prefix: 'auth.',
  },

  // -- Token --

  token: {
    prefix: '_token.',
  },

  // -- Refresh token --

  refresh_token: {
    prefix: '_refresh_token.',
  },

  // -- Strategies --
  defaultStrategy: 'claveUnica',

  strategies: {
    claveUnica: {
      scheme: '~/shared/utils/auth/schemes/clave-unica',
    },
  },
}
