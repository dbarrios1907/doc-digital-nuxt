import Upload from './Upload.vue'
import LoadUrl from '@/components/style-guide/upload/components/LoadUrl/index'
import Message from '~/components/style-guide/alerts/ToastService'

export default {
  title: 'Style Guide/Upload',
  component: Upload,
  argTypes: {},
}

export const Demo = () => ({
  components: { Upload, LoadUrl },
  methods: {
    upload() {
      this.$refs.uploader.upload()
    },
    uploadHandler() {
      console.log('Upload Handler')
    },
    onError(res, file) {
      console.log(file)
      Message.error({
        message: 'Error Uploading',
      })
    },
  },
  template: `
    <v-row no-gutters>
      <v-col cols='12'>
        <dx-button @click='upload'>upload</dx-button>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="6" class="py-0 pl-0 pr-4">
        <div>Documento a distribuir *</div>
        <div class="font-small line-height-24 weight-400 darken2--text mt-2 mb-5">
          Cargue solo un archivo en formato PDF de máximo 20 MB<br>El sistema reconocerá si éste viene firmado.
          <dx-icon left size="18" color="warning">mdi-help-circle</dx-icon>
        </div>
        <Upload ref='uploader' multiple v-bind="$props"
                :manual-upload="true"
                :limit="20000"
                :on-error='onError'
                action='/fileupload'
        />
        o
        <LoadUrl
          :dialog="dialogurl"
          title="Agregar url como archivo principal"
          button-text="Cargar Referencia URL"
          class="ml-2 d-inline-block"
        />
      </v-col>
    </v-row>
  `,
})
