<template>
  <svg :width="width" :height="height" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path :fill="_color" fill-rule="evenodd" clip-rule="evenodd" d="M14.99 10V13L11 9L14.99 5V8H22V10H14.99ZM2 14H9.01V11L13 15L9.01 19V16H2V14Z" />
  </svg>
</template>

<script>
import { colorMixin } from '@/shared/mixins/colorMixin'

export default {
  name: 'CompareArrowsIcon',
  props: {
    color: {
      Type: String,
      default: 'white'
    },
    width: {
      type: Number,
      default: 24
    },
    height: {
      type: Number,
      default: 24
    }
  },
  mixins: [colorMixin]
}
</script>
