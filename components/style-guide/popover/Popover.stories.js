import Vue from 'vue'
import Switch from '../switch/Switch'
import Button from '../button/Button'

export default {
  title: 'Style Guide/Popover',
  argTypes: {
    color: { control: { type: 'select', options: ['primary', 'secondary', 'success', 'warning'] } },
  },
}

Vue.component('doc-switch', Switch)
Vue.component('doc-button', Button)

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
  }),
  template: `
    <div class="text-center">
    <v-menu
        v-bind="$props"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <doc-button
            color="primary"
            v-bind="attrs"
            v-on="on"
        >
          Menu as Popover
        </doc-button>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="Juan"
              >
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Juan García</v-list-item-title>
              <v-list-item-subtitle>Administrador</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <doc-button
                  :class="fav ? 'red--text' : ''"
                  icon
                  @click="fav = !fav"
              >
                <v-icon>mdi-heart</v-icon>
              </doc-button>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <doc-switch
                  v-model="message"
                  color="purple"
              ></doc-switch>
            </v-list-item-action>
            <v-list-item-title>Habilitar Mensajes</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <doc-switch
                  v-model="hints"
                  color="purple"
              ></doc-switch>
            </v-list-item-action>
            <v-list-item-title>Habilidar Permisos de Administración</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <doc-button
              color="dark"
              text
              @click="menu = false"
          >
            Cancel
          </doc-button>
          <doc-button
            color="primary"
            text
            @click="menu = false"
          >
            Save
          </doc-button>
        </v-card-actions>
      </v-card>
    </v-menu>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  color: 'primary',
}
