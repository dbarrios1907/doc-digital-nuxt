export default {
  title: 'Style Guide/Form/IconSelect',
  argTypes: {
    
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
        <dx-iconselect
            :items="items"
            v-bind="$props"
            label="Ingrese la institución del destinatario"
            @get-selected="get_selected"
        >
        </dx-iconselect>
      </wrapper>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  closableItems: true,
}
