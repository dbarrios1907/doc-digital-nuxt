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
      <dx-session-expired-modal v-model='dialog' @onClose='dialog = !dialog'></dx-session-expired-modal>
    </div>
  `,
})

export const SessionExpiredModalStory = Template.bind({})
SessionExpiredModalStory.args = {}
