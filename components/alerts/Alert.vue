<template>
  <div class="dx-alert d-flex justify-content-center elevation-8" :class="'dx-type__' + type" v-bind="$listeners">
    <div class="dx-alert__wrapper d-inline-flex align-center py-3">
      <span class="d-flex px-5">
        <component :is="iconByType" />
      </span>

      <div class="dx-alert__content font-large d-inline flex-fill pr-12">
        <div v-if="title !== null && title !== undefined && title !== ''" class="dx-alert-title font-large weight-500">{{ title }}</div>
        <div class="vn-message"><slot /></div>
      </div>
    </div>
    <span class="dx-alert__closeable d-flex px-1 py-1" @click="dismiss">
      <alert-close-icon />
    </span>
  </div>
</template>

<script>
import './Alert.scss'

export default {
  name: 'DxAlert',
  inheritAttrs: false,
  props: {
    message: String,
    type: String,
    title: String,
    showLeftIcon: Boolean,
  },
  computed: {
    iconByType() {
      if (this.$props.type === 'info') {
        return 'alert-info-icon'
      }

      if (this.$props.type === 'warning') {
        return 'alert-warning-icon'
      }

      if (this.$props.type === 'success') {
        return 'alert-success-icon'
      }

      if (this.$props.type === 'error') {
        return 'alert-error-icon'
      }

      return false
    },
  },
  methods: {
    dismiss() {
      console.log('DISMISS')
      this.$emit('onDismiss')
    },
  },
}
</script>
