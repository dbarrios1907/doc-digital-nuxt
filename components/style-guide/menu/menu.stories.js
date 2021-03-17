export default {
  title: 'Style Guide/Menu',
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: () => ({
    items: [...Array(4)].map((_, i) => `Item ${i}`),
    label: 'Acción masiva'
  }),
  computed: {
    actionColor() {
      const isDark = this.$vuetify.theme.dark
      return isDark ? '' : 'deepblue'
    },
  },
  template: `
    <div>
      <v-menu offset-y>
        <template v-slot:activator="{ attrs, on }">
          <dx-button color="regular" text class="pl-2 my-2" v-bind="attrs" v-on="on">
            <span class="text-underline line-height-24 weight-400" :class="actionColor"> {{label}} </span>
            <dx-icon right regular> mdi-chevron-down </dx-icon>
          </dx-button>
        </template>
        <v-list>
          <v-list-item v-for="item in items" :key="item" link>
            <v-list-item-title>
              <span class="text-underline line-height-24 weight-400" :class="actionColor"> {{item}} </span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <create-doc-menu />
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {}
