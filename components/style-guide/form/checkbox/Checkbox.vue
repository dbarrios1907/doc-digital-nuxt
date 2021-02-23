<template>
  <v-checkbox dx-checkbox :v-model="selected" :ripple="ripple" :label="label" :value="value" checkbox-disabled-opacity></v-checkbox>
</template>

<script>
export default {
  name: 'DxCheckbox',
  inheritAttrs: false,
  props: {
    selected: {
      type: Array,
      default: [],
    },
    label: String,
    //value: String,
    ripple: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style lang="scss">
@include theme(v-input--checkbox) using($material) {
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
