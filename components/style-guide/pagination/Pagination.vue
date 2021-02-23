<template>
  <v-pagination v-bind="$attrs" class="dx-pagination" v-on="$listeners" />
</template>

<script>
export default {
  name: 'DxPagination',
  inheritAttrs: false,
}
</script>

<style lang="scss">
@include theme(dx-pagination) using($material) {
  .v-pagination__navigation,
  .v-pagination__item {
    height: 24px !important;
    min-width: 24px !important;
    margin: 0 0 0 5px;
    border-radius: 0;
    box-shadow: none;
    outline: none;
    font-size: 12px;
    font-weight: 400;
  }

  .v-pagination__item:not(.v-pagination__item--active) {
    border-bottom: 1px solid #0f69c4;
    color: #0f69c4;
  }

  .v-pagination__navigation i {
    transform: scale(1.6);
    width: 11px;
    height: 19px;
  }

  .v-pagination__navigation:not(.v-pagination__navigation--disabled) i {
    color: map-deep-get($material, 'colors', 'darken3') !important;
  }

  .v-pagination__navigation--disabled i {
    color: map-deep-get($material, 'colors', 'darken1') !important;
  }

  li:first-child .v-pagination__navigation,
  li:last-child .v-pagination__navigation {
    margin: 0;
    width: auto;
  }
}
</style>
