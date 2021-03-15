<template>
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1777 25.0586C20.0813 25.0586 25.6777 19.4622 25.6777 12.5586C25.6777 5.65503 20.0813 0.0585938 13.1777 0.0585938C6.27417 0.0585938 0.677734 5.65503 0.677734 12.5586C0.677734 19.4622 6.27417 25.0586 13.1777 25.0586Z"  :fill="_color"/>
  </svg>

</template>

<script>
import { colorMixin } from '@/shared/mixins/colorMixin'

export default {
  name: 'Done',
  props: {
    color: {
      Type: String,
      default: '#FFFFFF'
    }
  },
  mixins: [colorMixin]
}
</script>