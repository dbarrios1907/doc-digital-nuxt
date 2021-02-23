<template>
  <v-list-item :class="_nested" dx-list-item :ripple="false" v-bind="$attrs" v-on="$listeners">
    <slot />
  </v-list-item>
</template>

<script>
export default {
  name: 'DxNavListItem',
  inheritAttrs: true, // inherits from vuetify v-list-item
  props: {
    nested: Boolean,
  },
  computed: {
    _nested() {
      return this.nested ? 'dx-item-nested' : ''
    },
  },
}
</script>

<style lang="scss">
@include theme(v-list-item) using ($material) {
  $bg-color: map-deep-get($material, 'navigation', 'bg-color');
  $color: map-deep-get($material, 'colors', 'light');
  $active-opacity: map-deep-get($material, 'navigation', 'states', 'active');
  $hover-opacity: map-deep-get($material, 'navigation', 'states', 'hover');
  padding: 0 16px 0 24px;

  &[dx-list-item] {
    &.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
      color: $color !important;
    }

    .v-list-item__icon:first-child {
      margin-right: 12px;
    }

    &.dx-item-nested {
      padding-left: 44px;
    }

    &.v-list-item--active {
      color: $color;
    }

    .v-icon {
      color: $color;
    }
    &.v-list-item--link:before {
      background-color: darken($bg-color, 20%);
    }

    &:active {
      background: darken($bg-color, 10%);
      transition: background 0.2s linear;
    }
    &:hover::before {
      opacity: $hover-opacity;
    }
  }
}
</style>
