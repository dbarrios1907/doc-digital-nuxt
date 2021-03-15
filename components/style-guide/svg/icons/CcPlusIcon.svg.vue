<template>
  <v-btn class="list-item-btn px-1 py-1 primary--text line-height-18" color="light" rounded elevation="0" v-bind='$attrs' v-on='$listeners'>
    <v-icon color="primary" style='font-size: 20px !important'>mdi-plus-circle</v-icon>
    <span class="primary--text weight-300 mx-1">CC</span>
  </v-btn>
</template>

<script>
import { colorMixin } from '@/shared/mixins/colorMixin'

export default {
  name: 'CcPlusIcon',
  props: {
    color: {
      Type: String,
      default: 'white'
    }
  },
  mixins: [colorMixin]
}
</script>
<style lang='scss' scoped>
.list-item-btn {
  height: auto !important;
  min-width: auto !important;
}
</style>
