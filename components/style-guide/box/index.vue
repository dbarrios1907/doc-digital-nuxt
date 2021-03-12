<template>
  <div dx-box :class="_classes" v-bind="$attrs" v-on="$listeners">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'DxBox',
  inheritAttrs: false,
  props: {
    centered: Boolean,
    vcenter: Boolean,
    hcenter: Boolean,
    bordered: Boolean,
    elevation: Boolean,
    addClass: String,
  },
  computed: {
    _classes() {
      let _c = 'd-flex flex-fill '
      if (this.vcenter || this.centered) _c += 'align-center '
      if (this.hcenter || this.centered) _c += 'justify-center '
      if (this.bordered) _c += 'bordered '
      if (this.elevation) _c += 'elevation '
      return _c + this.addClass
    },
  },
}
</script>
<style scoped lang="scss">
@include theme-wrap([dx-box]) using($material) {
  &.bordered {
    border: 1px solid map-deep-get($material, 'colors', 'primary');
  }
  &.elevation {
    box-shadow: 0 1px 15px rgba(0, 0, 0, 0.2);
  }
}
</style>
