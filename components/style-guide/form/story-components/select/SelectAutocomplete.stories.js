export default {
  title: 'Style Guide/Form/SelectAutocomplete',
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
      items: [
        {
          key: "1",
          name: "Option 1"
        },
        {
          key: "2",
          name: "Option 2"
        },
        {
          key: "3",
          name: "Option 3"
        },
        {
          key: "4",
          name: "Option 4"
        },
        {
          key: "5",
          name: "Option 5"
        }
      ],
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
        <dx-select-autocomplete
            :items="items"
            v-bind="$props"
            label="Selección Simple"
            @get-selected="get_selected"
        >
        </dx-select-autocomplete>
      </wrapper>

      <wrapper>
        <dx-select-autocomplete
          :items="items"
          label="Multi Selección"
          v-bind="$props"
          multiple
          @get-selected="get_selected"
        >
        </dx-select-autocomplete>
      </wrapper>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  closableItems: true,
}
