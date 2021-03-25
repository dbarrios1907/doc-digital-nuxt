require('./envconfig')
import { themes } from './shared/theme/color-palette'
import es from 'vuetify/lib/locale/es'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  server: {
    port: 4000,
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - doc-digital-nuxt',
    title: 'doc-digital-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // styleResources: {
  //   scss: ['~/assets/styles/mixins.scss'],
  // },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/styles/main.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/v-idle.client.js',
    '~/plugins/tooltip.client.js',
    '~/plugins/perfect-scrollbar.js',
    '~/plugins/style-guide.js',
    '~/plugins/scroll-lock.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: ['~components/doc-digital'],

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/style-resources',
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    [
      '@nuxtjs/vuetify',
      {
        treeShake: true,
        customVariables: ['~/assets/styles/vuetify-overrides.scss'],
        theme: {
          themes,
        },
        lang: {
          locales: { es },
          current: 'es',
        },
      },
    ],
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '~/modules/auth',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'nuxt-webfontloader',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseUrl: process.env.BASE_API,
    browserBaseURL: process.env.BASE_API,
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  // vuetify: {
  //   optionsPath: './vuetify.options.js',
  // },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, { isDev, isClient }) {
      config.module.rules.push({
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader',
      })
      // Sets webpack's mode to development if `isDev` is true.
      // if (isDev) {
      //   config.mode = 'development'
      // }
      // Inject vuetify css variables before sass loader
      // hack to solve integration isues with vuetify

      // const injectSassOptions = (arrMod, appendOptions) => {
      //   arrMod.oneOf.map(v => {
      //     const found = v.use.find(l => l.loader.includes('/sass-loader/'))
      //     if (found) Object.assign(found.options, appendOptions)
      //   })
      // }
      //
      // config.module.rules.forEach(v => {
      //   if (v.test.test('.scss')) {
      //     injectSassOptions(v, { additionalData: `@import '~/assets/styles/vuetify-overrides.scss'; ` })
      //   } else if (v.test.test('.sass')) {
      //     injectSassOptions(v, { additionalData: `@import '~/assets/styles/vuetify-overrides.scss'` })
      //   }
      // })
    },
    transpile: ['vuetify'],
  },

  webfontloader: {
    google: {
      families: ['Roboto+Slab:400', 'Roboto:400,500,700', 'Nunito:300'],
    },
  },

  auth: {
    defaultStrategy: 'claveUnica',
    redirect: {
      home: '/',
      login: '/login', // redirect user when not connected
      callback: '/callback',
      unauthorized: '/401',
    },
    // use default strategy claveUnica
    // add strategies to customize or modify default strategy
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'login',
        path: '/login',
        auth: false,
        component: resolve(__dirname, 'components/doc-digital/login/index.vue'),
      })

      routes.push({
        name: 'login-callback',
        path: '/callback',
        auth: false,
        component: resolve(__dirname, 'components/doc-digital/login-callback/index.vue'),
      })

      routes.push({
        name: 'unauthorized',
        path: '/401',
        auth: false,
        component: resolve(__dirname, 'pages/401.vue'),
      })
    },
  },
}
