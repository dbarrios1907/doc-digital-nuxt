import StepFolio from './index'

export default {
  title: 'DocDigital/Stepper Steps',
  component: StepFolio,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { StepFolio },
  template: `
    <step-folio></step-folio>
  `,
})

export const StepFolioStory = Template.bind({})
StepFolioStory.args = {}
