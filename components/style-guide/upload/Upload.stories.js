import Upload from './Upload.vue'
import Message from '~/components/style-guide/alerts/ToastService'

export default {
  title: 'Style Guide/Upload',
  component: Upload,
  argTypes: {},
}

export const Demo = () => ({
  components: { Upload },
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
    <v-row>
      <v-col lg="3" sm="6">
        <dx-button @click='upload'>upload</dx-button>
        <Upload ref='uploader' multiple v-bind="$props"
            :manual-upload="true"
            :limit="20000"
                :on-error='onError'
                action='/fileupload'
        />
      </v-col>
    </v-row>
  `,
})
