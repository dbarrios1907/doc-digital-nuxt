import StepSignature from './index'

export default {
  title: 'DocDigital/Stepper Steps',
  component: StepSignature,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { StepSignature },
  template: `
    <step-signature></step-signature>
  `,
})

export const StepSignatureStory = Template.bind({})
StepSignatureStory.args = {}
