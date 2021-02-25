export default {
  title: 'Style Guide/Menu',
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: () => ({
    items: [...Array(4)].map((_, i) => `Item ${i}`),
  }),
  template: `
    <v-menu
        color="primary"
        offset-y
    >
    <template v-slot:activator="{ attrs, on }">
      <dx-button
          color="primary"
          class="ma-5"
          v-bind="attrs"
          v-on="on"
      >
        Menu button
      </dx-button>
    </template>

    <v-list>
      <v-list-item
          v-for="item in items"
          :key="item"
          link
      >
        <v-list-item-title v-text="item"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
  `,
})

export const Default = Template.bind({})
Default.args = {}
