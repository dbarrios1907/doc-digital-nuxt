<template>
  <div class="b-file-list py-2">
    <template v-for="file in filesLocal">
      <slot :file="file">
        <FileItem
          :id="file.id"
          ref="fileItem"
          class="px-2 py-2"
          :file="file"
          :status="file.status"
          :remove-enabled="removeEnabled"
          :description-prop="descriptionProp"
          @onRemove="onRemove"
        />
      </slot>
    </template>
  </div>
</template>

<script>
import UploadInputMixing from '../mixins/upload-inputs'
import { STATUS } from '../helpers/shared-properties'
import xhrUpload from '../helpers/ajax-uploader'
import { idMixin } from '@/shared/mixins/id'
import { hash } from '@/shared/utils/hash'
import FileItem from './FileItem'
import BvEvent from '~/shared/utils/event.class'

export default {
  components: {
    FileItem,
  },
  inject: {
    bUpload: {
      default() /* istanbul ignore next */ {
        return null
      },
    },
  },
  mixins: [idMixin, UploadInputMixing],
  props: {
    removeEnabled: {
      type: Boolean,
      default: () => true,
    },
    descriptionProp: {
      type: String,
    },
    files: {
      type: Array,
      default: () => [],
    },
    uploadThreads: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      // eslint-disable-next-line vue/no-reserved-keys
      _status: STATUS,
      fileName: 'file',
      filesLocal: [],
      reqs: {},
    }
  },
  computed: {
    _limit() {
      return this.limit
    },
  },
  watch: {
    files(newFiles) {
      this.initialize(newFiles)
    },
  },
  beforeMount() {
    this._status = STATUS
  },
  mounted() {
    this.initialize(this.files)
    if (!this.autoUpload && this.bUpload) {
      this.bUpload.$on('upload', () => this.uploadThreadsHandler(this.uploadThreads))
    }
  },
  methods: {
    genFileId(file) {
      const fileStr = file.name + file.lastModified + file.size + file.type
      return hash(fileStr)
    },
    initialize(files) {
      const _files = [...files]
      _files.forEach(f => {
        const id = this.genFileId(f)
        this.filesLocal.unshift(Object.assign(f, { id, status: STATUS.PENDING }))
      })

      if (this.autoUpload) {
        this.$nextTick(() => {
          this.uploadThreadsHandler()
        })
      }
    },
    async uploadThreadsHandler() {
      if (this._limit && this.filesLocal.length + this.files.length > this._limit) {
        this.onExceed && this.onExceed(this.files, this.filesLocal)
        return
      }
      const pending = this.filesLocal.find(f => f.status === STATUS.PENDING)
      if (pending) {
        pending.status = STATUS.IN_PROGRESS
        this.upload(pending)
      }
    },

    upload(rawFile) {
      if (!this.beforeUpload) {
        return this.post(rawFile)
      }
      const before = this.beforeUpload(rawFile)
      if (before !== false) {
        return this.post(rawFile)
      } else {
        return this.onRemove(null, rawFile)
      }
    },
    onSuccess(res, file) {
      //timing out to show progress bar
      setTimeout(() => {
        file.status = STATUS.SUCCESS
        this.bUpload.onSuccess(res, file)
        this.$forceUpdate()
      }, 400)

      this.uploadThreadsHandler()
    },

    onError(res, file) {
      //timing out to show progress bar
      setTimeout(() => {
        file.status = STATUS.FAIL
        this.bUpload.onError(res, file)
        this.$forceUpdate()
      }, 400)

      this.uploadThreadsHandler()
    },

    abort(file) {
      const { reqs } = this
      if (file) {
        let uid = file
        if (file.uid) uid = file.uid
        if (reqs[uid]) {
          reqs[uid].abort()
        }
      } else {
        Object.keys(reqs).forEach(uid => {
          if (reqs[uid]) reqs[uid].abort()
          delete reqs[uid]
        })
      }
    },
    post(rawFile) {
      const { uid } = rawFile
      const options = {
        headers: this.bUpload.headers || {},
        withCredentials: this.bUpload.withCredentials || false,
        file: rawFile,
        data: this.bUpload.data || {},
        filename: this.bUpload.name || this.fileName,
        action: this.bUpload.action,
        onProgress: e => {
          return this.onProgress(e, rawFile)
        },
        onSuccess: res => {
          this.onSuccess(res, rawFile)
          delete this.reqs[uid]
        },
        onError: err => {
          this.onError(err, rawFile)
          delete this.reqs[uid]
        },
      }
      const functor = this.bUpload.uploadHandler || xhrUpload
      const req = functor(options)
      this.reqs[uid] = req
      return req
    },
    onProgress(e, file) {
      this.$nextTick(() => {
        file.progress = Math.floor(e.percent)
        this.bUpload.onProgress(e, file)
        this.$forceUpdate()
      })
    },

    async onRemove(id) {
      // by call bvEvt.preventDefault()
      const tabEvt = new BvEvent('onRemove', {
        cancelable: true,
        vueTarget: this,
      })

      this.$emit(tabEvt.type, tabEvt)

      if (!tabEvt.defaultPrevented) {
        this.filesLocal = this.filesLocal.filter(f => f.id !== id)
      }
    },
  },
}
</script>
