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
    async openModal() {
      const value = await this.$refs.$entitySelectModal.open(true)
      console.log(value)
    },
  },
  template: `
    <div>
    <dx-button @click='openModal'>show modal</dx-button>
    <dx-entity-select-modal ref='$entitySelectModal'></dx-entity-select-modal>
    </div>

  `,
})

export const EntitySelectModalStory = Template.bind({})
EntitySelectModalStory.args = {}
