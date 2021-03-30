import autocomplete from './index'

export default {
  title: 'DocDigital/Single Selection Autocomplete',
  component: autocomplete,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { autocomplete },
  template: `
    <autocomplete fetch-action='entidades/fetchUserEntities'></autocomplete>
  `,
})

export const AutocompleteStory = Template.bind({})
AutocompleteStory.args = {}
