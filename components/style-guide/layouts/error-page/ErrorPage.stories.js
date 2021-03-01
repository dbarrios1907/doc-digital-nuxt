export default {
  title: 'Style Guide/Layouts',
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <ErrorPage />
  `,
})

export const ErrorPage = Template.bind({})
ErrorPage.args = {}
