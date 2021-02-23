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
      selected: [],
    }
  },
  template: `
    <v-container fluid>
      <dx-checkbox
          v-model="selected"
          :ripple="false"
          label="Text de Ejemplo 1"
          value="Text1"
      ></dx-checkbox>
      <dx-checkbox
          v-model="selected"
          :ripple="false"
          label="Text de Ejemplo 2"
          value="Text2"
      ></dx-checkbox>
      <dx-checkbox
        v-model="selected"
        :ripple="false"
        label="Text de Ejemplo 3"
        value="Text3"
      ></dx-checkbox>
      <dx-checkbox
        v-model="selected"
        :ripple="false"
        label="Text de Ejemplo 4"
        value="Text4"
      ></dx-checkbox>
    </v-container>
  `,
})

export const Checkbox = Template.bind({})
Checkbox.args = {}
