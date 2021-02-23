import Vue from 'vue'
import CustomValidation from './CustomValidation.vue'

Vue.component('custom-validation', CustomValidation)

export default {
  title: 'Style Guide/Form/Custom Validation',
  argTypes: {
    color: { control: { type: 'select', options: ['primary', 'secondary', 'neutral'] } },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
      <custom-validation />
  `,
})

export const Default = Template.bind({})
Default.args = {}
