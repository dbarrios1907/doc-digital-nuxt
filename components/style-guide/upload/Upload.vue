<template>
  <div class="b-upload font-large">
    <dx-button color="primary" outlined class="btn-upload" :disabled="!_moreUploadsAllowed" @click="onSelectionClick">
      <div class="btn-upload-content">
        <dx-icon right regular> mdi-cloud-upload-outline </dx-icon>
        <span class="text-underline">Cargar archivo</span>
      </div>
    </dx-button>

    <slot name="load-url">
      <dx-button color="primary" outlined class="btn-upload ml-2" :disabled="!_moreUploadsAllowed" @click="addReference">
        <div class="btn-upload-content">
          <dx-icon right regular> mdi-link </dx-icon>
          <span class="text-underline">{{ urlUploaderText }}</span>
        </div>
      </dx-button>
      <LoadUrl ref="$loadUrl" title="Agregar url como archivo principal" button-text="Cargar Referencia URL" class="ml-2" />
    </slot>

    <input
      :id="_id"
      ref="input"
      class="b-upload-input"
      type="file"
      :name="name"
      :disabled="disabled"
      :capture="capture || null"
      :accept="accept || null"
      :multiple="multiple"
      :action="action"
      :uploadThreads="uploadThreads"
    />

    <div>
      <div v-if="stackedFiles.length > 0" class="mt-2">Documentos</div>
      <FileList
        :files="stackedFiles"
        :upload-handler="uploadHandler"
        description-prop="name"
        :upload-threads="uploadThreads"
        :action="action"
        :auto-upload="!manualUpload"
        @onRemove="removeFile"
      />
    </div>

    <div>
      <div v-if="urlFiles.length > 0" class="my-2">Referencias</div>
      <UrlFile v-for="(url, index) in urlFiles" :key="index" class="mx-2 my-2" :file="url" description-prop="name" @onRemove="removeReference" />
    </div>

    <div>
      <div v-if="urlFiles.length > 0" class="my-2">Adjuntos salvados</div>
      <UrlFile
        v-for="(sf, index) in savedFiles"
        :key="index"
        class="mx-2 my-2"
        :file="sf"
        :description-prop="savedDescription"
        :name-prop="savedName"
        :id-prop="savedId"
        @onRemove="$store.deleteA"
      />
    </div>
  </div>
</template>

<script>
import FileList from './components/FileList'
import UrlFile from './components/UrlFile'
import LoadUrl from './components/LoadUrl'
import FormFileMixin from './mixins/form-file'
import UploadInputMixing from './mixins/upload-inputs'
import { isFile } from '@/shared/utils/inspect'
import { idMixin } from '@/shared/mixins/id'

export default {
  name: 'Upload',
  components: {
    FileList,
    LoadUrl,
    UrlFile,
  },
  provide() {
    return {
      bUpload: this,
    }
  },
  mixins: [FormFileMixin, UploadInputMixing, idMixin],
  props: {
    manualUpload: Boolean,
    fileNameFormatter: {
      type: Function,
      default: file => {
        console.log(file)
      },
    },
    action: {
      type: String,
      default: null,
    },
    uploadThreads: {
      type: Number,
      default: 1,
    },
    uploadHandler: {
      type: Function,
      default: null,
    },
    beforeUpload: {
      type: Function,
      default: () => true,
    },
    beforeRemove: {
      type: Function,
      default: () => true,
    },
    onRemove: {
      type: Function,
      default: null,
    },
    onSuccess: {
      type: Function,
      default: () => {},
    },
    onError: {
      type: Function,
      default: () => {},
    },
    onExceed: {
      type: Function,
      default: () => {},
    },
    onProgress: {
      type: Function,
      default: () => {},
    },
    urlUploaderText: {
      type: String,
      default: 'Cargar URL',
    },
    savedFiles: {
      type: Array,
      default: () => [],
    },
    savedDescription: {
      type: String,
      default: 'description',
    },
    savedName: {
      type: String,
      default: 'name',
    },
    savedId: {
      type: String,
      default: 'id',
    },
  },
  data() {
    return {
      stackedFiles: [],
      urlFiles: [],
    }
  },
  computed: {
    _id() {
      return this.safeId
    },
    _moreUploadsAllowed() {
      if (this.multiple) return true
      return !this.multiple && this.stackedFiles.length === 0 && this.urlFiles.length === 0 && this.savedFiles.length === 0
    },
  },
  watch: {
    plain() {
      this.removeListeners()
      this.addListeners()
    },
    manualUpload() {
      this.removeListeners()
      this.addListeners()
    },
    noDrop() {
      this.removeListeners()
      this.addListeners()
    },
  },
  mounted() {
    this.addListeners()
  },
  beforeDestroy() {
    this.removeListeners()
  },
  methods: {
    onSelectionClick() {
      this.$refs.input.click()
    },
    async addReference() {
      const urlFile = await this.$refs.$loadUrl.open()
      console.log(urlFile)
      if (urlFile) this.urlFiles.push(urlFile)
    },
    async removeReference(item) {
      this.urlFiles = this.urlFiles.filter(v => v.url !== item.url)
    },
    removeFile(evt) {
      this.stackedFiles = this.stackedFiles.filter(v => v.id !== evt.vueTarget)
      console.log(evt, this.stackedFiles)
    },
    detectFileChanges(files) {
      this.$emit('onFilesAttached')
      if (Array.isArray(files) && files.length > 0) {
        this.stackedFiles = files
      } else if (isFile(files)) {
        this.stackedFiles = [files]
      }
      this.$refs.input.value = ''
    },
    upload(e) {
      this.$emit('upload')
    },
    addListeners() {
      // listen for new added files
      // send new files to FileList component for upload handling and archived
      this.$on('input', this.detectFileChanges)
      this.$refs.input.addEventListener('change', this.onFileChange)
      this.$refs.input.addEventListener('focusin', this.focusHandler)
      this.$refs.input.addEventListener('focusout', this.focusHandler)
      this.$refs.input.addEventListener('reset', this.onReset)
    },
    removeListeners() {
      this.$off('input')
      this.$refs.input.removeEventListener('change', this.onFileChange)
      this.$refs.input.removeEventListener('focusin', this.focusHandler)
      this.$refs.input.removeEventListener('focusout', this.focusHandler)
      this.$refs.input.removeEventListener('reset', this.onReset)
    },
  },
}
</script>

<style lang="scss">
.btn-upload {
  .btn-upload-content {
    i {
      padding: 0 !important;
      margin: 0 !important;
      margin-right: 5px !important;
    }
  }
}

.b-upload {
  position: relative;
}

.b-upload-input {
  display: none;
  width: 100%;
}
</style>
