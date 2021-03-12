import TabDocEmail from './index'

export default {
  title: 'DocDigital/Tabs',
  component: TabDocEmail,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TabDocEmail },
  data: () => ({

  }),
  methods: {
    removeItem(item, index) {
      this.destinations = this.destinations.filter(v => v.id !== item.id)
    },
  },
  template: `
    <tab-doc-email></tab-doc-email>
  `,
})

export const AddEmailDestination = Template.bind({})
AddEmailDestination.args = {}
