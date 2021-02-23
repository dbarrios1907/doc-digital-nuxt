<template>
  <svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15 0C8.76344 0.00429334 3.56971 4.78513 3.05 11H0L4 15L8 11H5.05C5.51672 6.34649 9.1465 2.638 13.7889 2.07156C18.4314 1.50512 22.8463 4.23204 24.4183 8.6368C25.9902 13.0416 24.2993 17.9476 20.3472 20.4483C16.3951 22.9491 11.2375 22.3766 7.93 19.07L6.51 20.49C10.3512 24.3269 16.2901 25.1068 20.9917 22.3916C25.6933 19.6765 27.9861 14.1428 26.5827 8.8981C25.1793 3.65335 20.4293 0.00427265 15 0Z" :fill="_color"/>
  </svg>
</template>

<script>
import { colorMixin } from '@/shared/mixins/colorMixin'

export default {
  name: 'Reload',
  props: {
    color: {
      Type: String,
      default: '#ffffff'
    }
  },
  mixins: [colorMixin]
}
</script>