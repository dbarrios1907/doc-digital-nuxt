<template>
  <li v-if="file" tabindex="0" class="dx-list__item">
    <div class="dx-item__top d-flex align-center select-text flex-shrink-0">
      <div class="dx-item__start py-2 px-4 mr-3 rounded-pill secondary primary--text" :class="_textColor">
        {{ file[descriptionProp].split('.').pop() }}
      </div>

      <div class="dx-item__body text-truncate" :title="file[descriptionProp]" style="min-width: 0; width: 100%">
        {{ file[descriptionProp] }}
      </div>

      <div class="d-flex dx-item__end">
        <dx-icon class="pointer" right :color="_iconColor" medium @click="onDownload"> mdi-download </dx-icon>
        <dx-icon class="pointer" right :color="_iconColor" medium @click="onRemove"> mdi-trash-can-outline </dx-icon>
      </div>
    </div>
    <div class="dx-item__bottom py-1">
      <v-progress-linear :color="_iconColor" :value="progress" />
    </div>
  </li>
</template>
<script>
import { STATUS } from '../helpers/shared-properties'
global.File = typeof window === 'undefined' ? Object : window.File
export default {
  name: 'FileItem',
  model: {
    prop: 'file',
    event: 'change',
  },
  props: {
    removeEnabled: {
      type: Boolean,
      default: () => true,
    },
    descriptionProp: {
      type: String,
    },
    file: {
      type: [Object, File],
      default: null,
    },
    timeout: {
      type: Number,
      default: 15000,
    },
    status: {
      type: String,
      default: STATUS.PENDING,
    },
    progress: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    thumbnail: null,
  }),
  computed: {
    showProgress() {
      return this.status === STATUS.PENDING || this.status === STATUS.IN_PROGRESS
    },
    _textColor() {
      return this.status === 'fail' ? 'error--text' : 'primary--text'
    },
    _iconColor() {
      return this.status === 'fail' ? 'error' : 'primary'
    },
  },
  mounted() {
    this.thumbnail = URL.createObjectURL(this.file)
  },
  beforeUpdate() {
    this.thumbnail = URL.createObjectURL(this.file)
  },
  methods: {
    isSuccess(status) {
      return status === STATUS.SUCCESS
    },
    onDownload() {
      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(this.file)
        return
      }

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(this.file)
      const link = document.createElement('a')
      link.setAttribute('href', data)
      link.setAttribute('download', this.file.name)
      link.click()
      setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data)
      }, 100)
    },
    onRemove() {
      const { id, status } = this.file
      this.$emit('onRemove', id, status)
    },
  },
}
</script>

<style scoped lang="scss">
.dx-list__item {
  list-style: none;
  //flex-shrink: 0;
  .dx-item__body {
    color: black;
  }
  float: none;

  .dx-item__start {
    line-height: normal;
    float: left;
  }
  .dx-item__end {
    float: right;
  }
  .dx-item__bottom {
    clear: both;
  }
}
</style>
