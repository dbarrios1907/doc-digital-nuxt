export default {
  title: 'Style Guide/Layouts/Footer',
  argTypes: {
    color: { control: { type: 'color' } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <Footer :color="color" />
  `,
})

export const Default = Template.bind({})
Default.args = { color: 'white' }
