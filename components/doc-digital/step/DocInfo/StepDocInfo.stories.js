import StepDocInfo from './index'

export default {
  title: 'DocDigital/Stepper Steps',
  component: StepDocInfo,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { StepDocInfo },
  template: `
    <step-doc-info></step-doc-info>
  `,
})

export const StepDocInfoStory = Template.bind({})
StepDocInfoStory.args = {}
