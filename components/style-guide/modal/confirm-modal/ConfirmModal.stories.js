export default {
  title: 'Style Guide/Modal',
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: {
    async openModal() {
      const value = await this.$refs.$confirm.open('Some title', 'Some text that is very large a descriptive for the users ?')
      console.log(value)
    },
  },
  template: `
    <div>
      <dx-button @click='openModal'>show confirm</dx-button>
      <dx-confirm-modal ref='$confirm'/>
    </div>
  `,
})

export const ConfirmModalStory = Template.bind({})
ConfirmModalStory.args = {}
