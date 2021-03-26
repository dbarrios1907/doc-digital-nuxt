export default {
  title: 'Style Guide/Modal',
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: () => ({
    dialog: false,
  }),
  methods: {
    openModal() {
      this.$refs.$confirm.open('Some title', 'Some text')
    },
  },
  template: `
    <div>
      <dx-button @click='openModal'>show confirm</dx-button>
      <dx-confirm-modal ref='$confirm'/>
    </div>
  `,
})

export const ConfirmModal54345Story = Template.bind({})
ConfirmModal54345Story.args = {}
