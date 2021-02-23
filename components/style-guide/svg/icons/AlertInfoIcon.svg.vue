<template>
  <svg width="32" height="39" viewBox="0 0 32 39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path :fill="_color" fill-rule="evenodd" clip-rule="evenodd" d="M28 27V17C28 10.86 24.74 5.72 19 4.36V3C19 1.34 17.66 0 16 0C14.34 0 13 1.34 13 3V4.36C7.28 5.72 4 10.84 4 17V27L0 31V33H32V31L28 27ZM16 39C18.2 39 20 37.2 20 35H12C12 37.2 13.8 39 16 39ZM8 29H24V17C24 12.04 20.98 8 16 8C11.02 8 8 12.04 8 17V29Z" />
  </svg>
</template>

<script>
import { colorMixin } from '@/shared/mixins/colorMixin'

export default {
  name: 'AlertInfoIcon',
  props: {
    color: {
      Type: String,
      default: '#0F69C4'
    }
  },
  mixins: [colorMixin]
}
</script>

