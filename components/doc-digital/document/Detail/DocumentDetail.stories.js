import DocumentDetail from './index'
export default {
  title: 'DocDigital/Document',
  component: DocumentDetail,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: () => ({
    dialog: false,
  }),
  components: {
    DocumentDetail,
  },
  methods: {
    filter() {
      alert('Filtering Values')
      this.dialog = false
    },
  },
  template: `
    <div>
      <DocumentDetail />
    </div>
  `,
})

export const DocumentDetailStory = Template.bind({})
DocumentDetailStory.args = {}
