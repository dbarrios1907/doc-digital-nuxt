export default {
  title: 'Style Guide/Pagination',
  argTypes: {
    color: { control: { type: 'color' } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      page: 1,
      pageCount: 3,
    }
  },
  template: `
    <dx-pagination v-model="page" :length="pageCount" />
  `,
})

export const Default = Template.bind({})
Default.args = {}
