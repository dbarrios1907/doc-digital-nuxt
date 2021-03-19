import DocumentTray from './index'
export default {
  title: 'DocDigital/Document',
  component: DocumentTray,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: () => ({
    dialog: false,
  }),
  components: {
    DocumentTray,
  },
  methods: {
    filter() {
      alert('Filtering Values')
      this.dialog = false
    },
  },
  template: `
    <div>
      <DocumentTray />
    </div>
  `,
})

export const DocumentTrayStory = Template.bind({})
DocumentTrayStory.args = {}
