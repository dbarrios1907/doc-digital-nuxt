import './Collapse.scss'

export default {
  title: 'Style Guide/Collapse',
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      items: [
        {
          title: '¿Qué es la ClaveÚnica?',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore         magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
          title: '¿Cómo solicito mi Clave?',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore         magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
      ],
    }
  },
  template: `
    <v-row justify="center">
      <dx-collapse :items="items"></dx-collapse>
    </v-row>
  `,
})

export const Default = Template.bind({})
Default.args = {}
