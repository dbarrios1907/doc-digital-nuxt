<template>
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path :fill="_color" fill-rule="evenodd" clip-rule="evenodd" d="M19.98 0C8.94 0 0 8.96 0 20C0 31.04 8.94 40 19.98 40C31.04 40 40 31.04 40 20C40 8.96 31.04 0 19.98 0ZM22 22V10H18V22H22ZM22 30V26H18V30H22ZM4 20C4 28.84 11.16 36 20 36C28.84 36 36 28.84 36 20C36 11.16 28.84 4 20 4C11.16 4 4 11.16 4 20Z"/>
  </svg>
</template>

<script>
import { colorMixin } from '@/shared/mixins/colorMixin'

export default {
  name: 'AlertWarningIcon',
  props: {
    color: {
      Type: String,
      default: '#F56B0F'
    }
  },
  mixins: [colorMixin]
}
</script>

