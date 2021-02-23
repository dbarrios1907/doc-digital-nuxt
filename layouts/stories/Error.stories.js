import { storyPath } from './_settings'

export default {
  title: storyPath,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <ErrorPage />
  `,
})

export const Error = Template.bind({})
Error.args = {}
