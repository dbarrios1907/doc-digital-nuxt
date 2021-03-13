<template>
  <dx-button dx-step-button elevation="0" tile retain-focus-on-click :ripple="false" v-bind="$attrs" v-on="$listeners">
    <slot />
  </dx-button>
</template>
<script>
export default {
  name: 'DxStepButton',
}
</script>
<style lang="scss">
@include theme(v-btn) using($material) {
  $white-color: map-deep-get($material, 'colors', 'light');
  $success-color: map-deep-get($material, 'colors', 'success');
  &[dx-step-button] {
    &.v-btn--text {
      border: 1px solid transparent;
    }

    &.success {
      border: 1px solid $success-color;
    }

    &:focus,
    &:active {
      outline: none;
      border: 1px dashed $white-color;
    }

    &.v-btn--text:focus {
      outline: none;
      border: 1px dashed $white-color;
    }
  }
}
</style>
