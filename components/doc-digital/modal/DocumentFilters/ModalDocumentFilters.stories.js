import ModalDocumentFilters from './index'
export default {
  title: 'DocDigital/Modal',
  component: ModalDocumentFilters,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: () => ({
    dialog: false,
  }),
  components: {
    ModalDocumentFilters,
  },
  methods: {
    filter() {
      alert('Filtering Values')
      this.dialog = false
    },
  },
  template: `
    <div>
      <ModalDocumentFilters v-model='dialog' @onClose='dialog=false' @onCancel='dialog=false' @onFilter='filter'></ModalDocumentFilters>
      <dx-button @click='dialog=true'>
        <span class='text-underline'>Filtra tu búsqueda</span>
        <dx-icon right>mdi-filter</dx-icon>
      </dx-button>
    </div>
  `,
})

export const DocumentFiltersStory = Template.bind({})
DocumentFiltersStory.args = {}
