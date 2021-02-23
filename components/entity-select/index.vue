<template>
  <v-overflow-btn dx-entity-overflow v-bind="$attrs" v-on="$listeners" />
</template>

<script>
export default {
  name: 'DxEntityOverflow',
  inheritAttrs: true,
}
</script>

<style lang="scss">
@include theme(v-overflow-btn) using ($material) {
  &[dx-entity-overflow] {
  }
}
</style>
