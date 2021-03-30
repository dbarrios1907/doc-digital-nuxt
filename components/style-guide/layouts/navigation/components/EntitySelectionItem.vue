<template>
  <div class="d-flex justify-center align-center px-4 py-2" style="flex-shrink: 0" @click="onEntitySelection">
    <span class="d-flex-inline flex-fill text-truncate light--text" style="max-width: 260px">{{ entityName }} </span>
    <i tabindex="0" class="d-flex justify-center dx-action-icon"><CompareArrowsIcon /> </i>
  </div>
</template>

<script>
export default {
  name: 'DxEntitySelectionItem',
  inheritAttrs: true,
  props: {
    entityName: String,
  },
  methods: {
    onEntitySelection() {
      this.$emit('onFocus')
    },
  },
}
</script>
<style lang="scss">
@include theme-wrap('.dx-action-icon') using ($material) {
  $primary: map-deep-get($material, 'colors', 'primary');
  $light: map-deep-get($material, 'colors', 'light');
  position: relative;
  cursor: pointer;
  outline: none;
  &:focus::after {
    opacity: 0.2;
  }

  &::after {
    background-color: $light;
    border-radius: 50%;
    content: '';
    display: inline-block;
    height: 100%;
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    transform: scale(1.4);
    width: 100%;
    transition: opacity 0.2s linear;
  }
}
</style>
