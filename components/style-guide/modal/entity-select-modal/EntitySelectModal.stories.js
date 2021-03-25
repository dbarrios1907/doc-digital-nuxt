export default {
  title: 'Style Guide/Modal',
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: () => ({
    dialog: false,
  }),
  template: `
    <div>
    <dx-button @click='dialog = !dialog'>toogle dialog</dx-button>
    <dx-session-closed-modal v-model='dialog'></dx-session-closed-modal>
    </div>

  `,
})

export const EntitySelectModalStory = Template.bind({})
EntitySelectModalStory.args = {}
