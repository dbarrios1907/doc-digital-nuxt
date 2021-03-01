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
  $focus-background: #062a4e;
  padding: 0 16px 0 24px;

  &[dx-list-item] {
    &.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
      color: $color !important;
    }

    &.dx-item-nested {
      padding-left: 44px;
    }

    .v-icon {
      color: $color;
    }

    .v-list-item__icon:first-child {
      margin-right: 12px;
    }

    &.v-list-item--link {
      .v-list-item__title {
        text-decoration: underline;
      }

      &.v-list-item--active {
        color: $color;
        font-weight: 700;
      }

      &:before {
        background-color: darken($bg-color, 20%);
      }

      &:focus,
      &:active {
        font-weight: bold;
        background: $focus-background;
      }

      &:hover::before {
        opacity: $hover-opacity;
      }

      &:active {
        background: darken($bg-color, 10%);
        transition: background 0.2s linear;
      }
    }
  }
}
</style>
