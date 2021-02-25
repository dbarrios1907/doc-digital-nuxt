<template>
  <v-checkbox dx-checkbox :ripple="ripple" :label="label" checkbox-disabled-opacity />
</template>

<script>
export default {
  name: 'DxCheckbox',
  inheritAttrs: false,
  props: {
    selected: {
      type: Array,
      default: () => [],
    },
    label: String,
    ripple: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style lang="scss">
@include theme(v-input--checkbox) using($material) {
  margin-top: 0;
  .v-input__slot {
    margin-bottom: 0;
  }
  .v-label {
    line-height: rem-calc(18px) !important;
    font-weight: 400 !important;
    padding-top: 2px !important;
  }
  .v-input__control i.v-icon {
    font-size: rem-calc(32px) !important;
  }
}
</style>
