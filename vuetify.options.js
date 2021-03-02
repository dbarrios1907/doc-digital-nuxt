// import * as _Vuetify from 'vuetify/lib'
import { themes } from '~/shared/theme/color-palette'
import es from 'vuetify/lib/locale/es'

// const Vuetify = _Vuetify.default

// const isVueComponent = obj => obj.name === 'VueComponent'
//
// const VComponents = Object.keys(_Vuetify).reduce((acc, key) => {
//   if (isVueComponent(_Vuetify[key])) {
//     acc[key] = _Vuetify[key]
//   }
//   return acc
// }, {})

export default {
  treeShake: true,
  // customVariables: ['~/assets/styles/vuetify-overrides.scss'],
  // components: {
  //   ...VComponents,
  //   VExpandTransition: _Vuetify.VExpandTransition,
  //   VSlideXReverseTransition: _Vuetify.VSlideXReverseTransition,
  //   VSlideYTransition: _Vuetify.VSlideYTransition,
  //   VFadeTransition: _Vuetify.VFadeTransition,
  // },
  theme: {
    // options: {
    //   customProperties: true,
    // },
    themes,
  },
  lang: {
    locales: { es },
    current: 'es',
  },
  // icons: {
  //   iconfont: 'mdi',
  // },
}
