<template>
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path :fill="_color" fill-rule="evenodd" clip-rule="evenodd" d="M20.0001 0C8.96006 0 6.10352e-05 8.96 6.10352e-05 20C6.10352e-05 31.04 8.96006 40 20.0001 40C31.0401 40 40.0001 31.04 40.0001 20C40.0001 8.96 31.0401 0 20.0001 0ZM20.0001 36C11.1801 36 4.00006 28.82 4.00006 20C4.00006 11.18 11.1801 4 20.0001 4C28.8201 4 36.0001 11.18 36.0001 20C36.0001 28.82 28.8201 36 20.0001 36ZM16.0001 24.3401L29.1801 11.1601L32.0001 14.0001L16.0001 30.0001L8.00006 22.0001L10.8201 19.1801L16.0001 24.3401Z" />
  </svg>
</template>

<script>
import { colorMixin } from '@/shared/mixins/colorMixin'

export default {
  name: 'AlertSuccessIcon',
  props: {
    color: {
      Type: String,
      default: '#00ADA2'
    }
  },
  mixins: [colorMixin]
}
</script>

