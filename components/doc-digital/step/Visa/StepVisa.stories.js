import StepVisa from './index'

export default {
  title: 'DocDigital/Stepper Steps',
  component: StepVisa,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { StepVisa },
  template: `
    <step-visa></step-visa>
  `,
})

export const StepVisaStory = Template.bind({})
StepVisaStory.args = {}
