import Vue from 'vue'
import { addDecorator } from '@storybook/vue'
import vuetify from './plugins/vuetify'
// import '@/plugins/vee-validate'
import styleGuidePlugin from './plugins/style-guide'
import VTooltip from '@/plugins/tooltip.client'
Vue.use(styleGuidePlugin)
import '@/assets/styles/main.scss'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

Vue.use(PerfectScrollbar)
addDecorator(() => ({
  vuetify,
  template: `
    <v-app style="overflow: auto">
      <div class="dx-notification-container"/>
      <v-container fluid class="px-0 mx-0">
        <story/>
      </v-container>
    </v-app>
    `,
}))

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}
