export default {
  title: 'Style Guide/Form/Select',
  argTypes: {
    closableItems: { control: { type: 'boolean' } },
  },
}

const wrapper = {
  template: `
    <v-row>
      <v-col cols="12" sm="6" lg="4">
        <slot></slot>
      </v-col>
    </v-row>
  `,
}

const Template = (args, { argTypes }) => ({
  components: {
    wrapper,
  },
  props: Object.keys(argTypes),
  data() {
    return {
      valueSelected: [],
      items: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    }
  },
  methods: {
    get_selected(sel) {
      this.valueSelected = sel
    },
  },
  template: `
    <div>
      <wrapper>
        <dx-select
            :items="items"
            v-bind="$props"
            label="Selección Simple"
            @get-selected="get_selected"
        >
        </dx-select>
      </wrapper>

      <wrapper>
        <dx-select
          :items="items"
          label="Multi Selección"
          v-bind="$props"
          multiple
          @get-selected="get_selected"
        >
        </dx-select>
      </wrapper>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  closableItems: true,
}
