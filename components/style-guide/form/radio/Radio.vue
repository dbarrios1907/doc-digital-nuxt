<template>
  <v-radio-group :v-model="radiomodel" :items="items" :row="row" :column="column" :v-bind="$props">
    <v-radio v-for="item of items" :key="item.value" :label="item.label" :value="item.value" :ripple="false"></v-radio>
  </v-radio-group>
</template>

<script>
export default {
  name: 'DxRadio',
  inheritAttrs: true,
  props: {
    radiomodel: null,
    items: Array,
    row: Boolean,
    column: Boolean,
  },
}
</script>
<style lang="scss">
@include theme(v-input--radio-group) using($material) {
  .v-label {
    line-height: rem-calc(24px) !important;
    font-weight: 400 !important;
    padding-top: 2px !important;
  }
  .v-input__control i.v-icon {
    font-size: rem-calc(32px) !important;
  }
}
</style>
