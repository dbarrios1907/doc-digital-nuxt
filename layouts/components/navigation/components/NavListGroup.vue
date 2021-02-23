<template>
  <v-list-group dx-list-group :ripple="false" v-bind="$attrs" v-on="$listeners">
    <!-- Pass on all named slots -->
    <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot" />

    <!-- Pass on all scoped slots -->
    <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope"><slot :name="slot" v-bind="scope" /></template>
  </v-list-group>
</template>

<script>
export default {
  name: 'DxNavListGroup', // inherits from vuetify v-list-group
  inheritAttrs: true,
}
</script>

<style lang="scss">
@include theme(v-list-group) using ($material) {
  $bg-color: map-deep-get($material, 'navigation', 'bg-color');
  $color: map-deep-get($material, 'colors', 'light');
  $active-opacity: map-deep-get($material, 'navigation', 'states', 'active');
  $hover-opacity: map-deep-get($material, 'navigation', 'states', 'hover');

  &[dx-list-group] {
    .v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
      color: $color !important;
      .v-icon {
        color: $color !important;
      }
    }

    .v-list-item__icon:first-child {
      margin-right: 12px;
    }

    &.v-list-group--active {
      position: relative;
      &::before {
        background-color: darken($bg-color, 15%);
        bottom: 0;
        content: '';
        left: 0;
        opacity: $active-opacity;
        pointer-events: none;
        position: absolute;
        right: 0;
        top: 0;
      }
    }

    .v-list-item--link::before {
      background-color: darken($bg-color, 15%);
    }

    .v-list-item--link:hover::before {
      opacity: $hover-opacity;
    }
  }
}
</style>
