import Vue from 'vue'

export default {
  title: 'Style Guide/Form/Select',
  argTypes: {
    color: { control: { type: 'select', options: ['primary', 'success', 'warning', 'error'] } },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
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
  components:{
    wrapper
  },
  props: Object.keys(argTypes),
  data () {
    return {
      valueSelected: [],
      items: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    }
  },
  methods: {
      get_selected(sel){
          this.valueSelected = sel;
          console.log(this.valueSelected);
      }
  },
  template: `
    <div>
      <wrapper>
        <dx-select
            :items="items"
            label="Selección Simple"
            @get-selected="get_selected"
        >
        </dx-select>
      </wrapper>
  
      <wrapper>
        <dx-select
          :items="items"
          label="Multi Selección"
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
  color: 'primary',
}
