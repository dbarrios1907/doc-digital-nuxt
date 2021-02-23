export default {
  title: 'Style Guide/Form',
  argTypes: {
    color: { control: { type: 'select', options: ['primary', 'secondary', 'neutral'] } },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      column: null,
      row: null,
      items:[
        { label:"Option 1", value: "radio-1" },
        { label:"Option 2", value: "radio-2" },
      ]
    }
  },
  template: `
    <v-container fluid>
      <dx-radio :v-model="column" column :items="items" />
      <hr>
      <dx-radio :v-model="row" row :items="items" />
    </v-container>
  `,
})

export const Radio = Template.bind({})
Radio.args = {}
