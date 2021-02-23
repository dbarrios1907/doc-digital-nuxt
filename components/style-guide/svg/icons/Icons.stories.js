export default {
  title: 'Style Guide/Svg/Icons',
  argTypes: {
    color: { control: { type: 'select', options: ['primary', 'secondary', 'neutral'] } },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <div>
      <alert-error-icon color="error" />
      <alert-warning-icon color="warning" />
      <alert-success-icon color="success" />
      <alert-info-icon color="primary" />
      <doc-sign-icon fill="white" color="primary" />
      <doc-signed-icon fill="white" color="primary" />
      <doc-digital-icon color="primary"/>
      <vector color="primary"/>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {}
