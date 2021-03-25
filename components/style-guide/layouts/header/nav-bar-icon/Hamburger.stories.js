export default {
  title: 'Style Guide/Layouts/Header',
  argTypes: {
    color: { control: { type: 'select', options: ['primary', 'secondary', 'neutral'] } },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: () => ({
    active: false,
  }),
  methods: {
    onToggleMenu() {
      this.active = !this.active
    },
  },
  template: `
    <dx-nav-bar-icon :isActive="active" color='primary' @onToggleMenu='onToggleMenu'/>
  `,
})

export const NavBarIconStory = Template.bind({})
NavBarIconStory.args = {}
