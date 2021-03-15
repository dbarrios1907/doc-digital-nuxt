import TabDocSavedList from './index'

export default {
  title: 'DocDigital/Tabs',
  component: TabDocSavedList,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TabDocSavedList },
  methods: {
    removeItem(item, index) {
      this.destinations = this.destinations.filter(v => v.id !== item.id)
    },
  },
  template: `
    <tab-doc-saved-list></tab-doc-saved-list>
  `,
})

export const TabDocSavedListStory = Template.bind({})
TabDocSavedListStory.args = {}
