import SignList from './index'

export default {
  title: 'DocDigital/Sign List',
  component: SignList,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  components: { SignList },
  template: `
    <sign-list :mock='true' username-prop='name' entity-prop='symbol'></sign-list>
  `,
})

export const SignListStory = Template.bind({})
SignListStory.args = {}
