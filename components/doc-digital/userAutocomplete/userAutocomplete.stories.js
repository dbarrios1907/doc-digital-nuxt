import autocomplete from './index'

export default {
  title: 'DocDigital/User Autocomplete',
  component: autocomplete,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { autocomplete },
  template: `
    <autocomplete></autocomplete>
  `,
})

export const AutocompleteStory = Template.bind({})
AutocompleteStory.args = {}
