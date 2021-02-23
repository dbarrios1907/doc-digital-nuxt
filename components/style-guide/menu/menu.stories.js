export default {
  title: 'Style Guide/Menu',
  argTypes: {
    color: { control: { type: 'select', options: ['primary', 'secondary', 'neutral'] } },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: () => ({
    colors: ['deep-purple accent-4', 'error', 'teal darken-1'],
    items: [...Array(4)].map((_, i) => `Item ${i}`),
  }),
  template: `
    <v-menu
        v-for="([text, rounded], index) in btns"
        :key="text"
        :rounded="rounded"
        offset-y
    >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
          :color="colors[index]"
          class="white--text ma-5"
          v-bind="attrs"
          v-on="on"
      >
        {{ text }} Radius
      </v-btn>
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
