import TabDocOffice from './index'

export default {
  title: 'DocDigital/Tabs',
  component: TabDocOffice,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TabDocOffice },
  methods: {
    removeItem(item, index) {
      this.destinations = this.destinations.filter(v => v.id !== item.id)
    },
  },
  template: `
    <tab-doc-office></tab-doc-office>
  `,
})

export const TabDocOfficeStory = Template.bind({})
TabDocOfficeStory.args = {}
