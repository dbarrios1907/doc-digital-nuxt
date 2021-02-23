export default {
  title: 'Style Guide/PendingDocuments',
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      items: [
        //    {
        //      name: 'Visar',
        //      count: 22
        //    },
        //    {
        //      name: 'Firmar',
        //      count: 4
        //    },
        //    {
        //      name: 'Recibir',
        //      count: 8
        //    }
      ],
    }
  },
  template: `
      <v-row justify="center">
        <dx-pendingdocs :items="items"></dx-pendingdocs>
      </v-row>
    `,
})

export const Default = Template.bind({})
Default.args = {}
