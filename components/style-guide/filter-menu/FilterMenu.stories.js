export default {
    title: 'Style Guide/FilterMenu',
    argTypes: {},
  }

  const wrapper = {
    template: `
    <v-row justify="center">
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
    data() {
      return {
        items: [...Array(4)].map((_, i) => `Texto de ejemplo  ${i}`),
        selected: [],
      }
    },
    methods: {
        get_selected(sel){
            this.selected = sel;
            console.log(this.selected);
        }
    },
    template: `
        <wrapper>
            <dx-icons-actions /> 
            <dx-filtermenu :items="items" @get-selected="get_selected"></dx-filtermenu>         
        </wrapper>
    `,
  })
  
  export const Default = Template.bind({})
  Default.args = {}