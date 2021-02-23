<template>
  <svg :width="width" :height="height" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path :fill="_color" fill-rule="evenodd" clip-rule="evenodd" d="M17.776 1.71004L16.356 0.290039L9.06596 7.59004L1.77596 0.290039L0.355957 1.71004L7.65596 9.00004L0.355957 16.29L1.77596 17.71L9.06596 10.41L16.356 17.71L17.776 16.29L10.476 9.00004L16.776 2.71004L17.776 1.71004Z"/>
  </svg>

</template>

<script>
import { colorMixin } from '@/shared/mixins/colorMixin'

export default {
  name: 'AlertCloseIcon',
  props: {
    color: {
      Type: String,
      default: '#373737'
    },
    width: {
      type: Number,
      default: 16
    },
    height: {
      type: Number,
      default: 16
    }
  },
  mixins: [colorMixin]
}
</script>
