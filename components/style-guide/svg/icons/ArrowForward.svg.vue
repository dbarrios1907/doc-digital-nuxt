<template>
  <svg width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9731 0.841797L12.7805 1.9068L17.6516 6.2493H0.359375V7.7493H17.6516L12.7805 12.0918L13.9731 13.1568L20.8597 6.9993L13.9731 0.841797Z" :fill="_color"/>
  </svg>
</template>

<script>
import { colorMixin } from '@/shared/mixins/colorMixin'

export default {
  name: 'ArrowForward',
  props: {
    color: {
      Type: String,
      default: '#001C41'
    }
  },
  mixins: [colorMixin]
}
</script>