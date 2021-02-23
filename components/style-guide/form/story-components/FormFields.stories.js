import Vue from 'vue'
import TextField from './text-field/TextField.vue'

Vue.component('doc-text-field', TextField)

export default {
  title: 'Style Guide/Form',
  argTypes: {
    color: { control: { type: 'select', options: ['primary', 'secondary', 'neutral'] } },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <doc-text-field rules="required" name="some-field"/>
  `,
})

export const Textfield = Template.bind({})
Textfield.args = {}
