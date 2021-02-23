<template>
  <li v-if="file" tabindex="0" class="dx-list__item d-flex align-center select-text">
    <div class="dx-item__start py-2 px-4 mr-3 rounded-pill secondary primary--text">
      {{ file[descriptionProp].split('.').pop() }}
    </div>

    <div class="b-item__body flex-fill">
      {{ file[descriptionProp] }}
    </div>

    <div class="dx-item__bottom">
      <dx-icon right color="primary" medium> mdi-download </dx-icon>
      <dx-icon right color="primary" medium> mdi-trash-can-outline </dx-icon>
    </div>
  </li>
</template>
<script>
import { STATUS } from '../helpers/shared-properties'

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
  },
  data: () => ({
    thumbnail: null,
  }),
  computed: {
    showProgress() {
      return this.status === STATUS.PENDING || this.status === STATUS.IN_PROGRESS
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
    onRemove(e, id, status) {
      this.$emit('onRemove', id, status)
    },
  },
}
</script>

<style lang="scss">
.dx-list__item {
  .dx-item__body {
    color: black;
    flex: 1 1 auto;
  }

  .dx-item__start {
    line-height: normal;
  }
}
</style>
