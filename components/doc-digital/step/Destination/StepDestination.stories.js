import StepDestination from './index'

export default {
  title: 'DocDigital/Stepper Steps',
  component: StepDestination,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { StepDestination },
  template: `
    <step-destination></step-destination>
  `,
})

export const StepDestinationStory = Template.bind({})
StepDestinationStory.args = {}
