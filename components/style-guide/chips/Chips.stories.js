export default {
  title: 'Style Guide/Chips',
  argTypes: {
    color: { control: { type: 'select', options: ['primary', 'secondary', 'neutral'] } },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
    outlined: { control: { type: 'boolean', default: true } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    
  `,
})

export const Default = Template.bind({})
Default.args = {}
