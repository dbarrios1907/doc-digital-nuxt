export default {
  title: 'Style Guide/UserForm1',
  argTypes: {},
}

import UserForm from './UserForm.vue'

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    UserForm,
  },
  template:   
  ` 
    <UserForm />

  `,
})

export const Default = Template.bind({})
Default.args = {}
