export default {
  title: 'Style Guide/Form/DatePicker',
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  template: `
    <v-row justify="center">

    <v-col lg="4">
      <dx-date-picker
          no-title
          color="primary"
      />
    </v-col>

    <v-col lg="4"></v-col>
    </v-row>
  `,
})

export const Default = Template.bind({})
Default.args = {}
