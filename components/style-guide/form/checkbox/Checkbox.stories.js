export default {
  title: 'Style Guide/Form',
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      selected: [],
    }
  },
  template: `
    <v-container fluid>
      <dx-checkbox
          v-model="selected"
          :ripple="false"
          label="Text de Ejemplo 1"
      ></dx-checkbox>
      <dx-checkbox
          v-model="selected"
          :ripple="false"
          label="Text de Ejemplo 2"
      ></dx-checkbox>
      <dx-checkbox
        v-model="selected"
        :ripple="false"
        label="Text de Ejemplo 3"
      ></dx-checkbox>
      <dx-checkbox
        v-model="selected"
        :ripple="false"
        label="Text de Ejemplo 4"
      ></dx-checkbox>
    </v-container>
  `,
})

export const Checkbox = Template.bind({})
Checkbox.args = {}
