import IconsActions from './IconsActions'

export default {
  title: 'Style Guide/IconsActions',
  argTypes: {
    color: { control: { type: 'color' } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <dx-icons-actions />
  `,
})

export const Default = Template.bind({})
Default.args = {}
