import { themes } from '~/shared/theme/color-palette'
import es from 'vuetify/lib/locale/es'

export default {
  treeShake: true,
  customVariables: ['~/assets/styles/vuetify-overrides.scss'],
  theme: {
    themes,
  },
  lang: {
    locales: { es },
    current: 'es',
  },
}
