<template>
  <span style="padding: 0 15px" @click="toggleClick">
    <svg :class="{ 'is-active': isActive }" class="hamburger" :width="width" :height="height" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path :fill="_color" fill-rule="evenodd" clip-rule="evenodd" d="M0 0H28V2H0V0ZM0 9H28V11H0V9ZM28 18H0V20H28V18Z" />
    </svg>
  </span>
</template>

<script>
import { colorMixin } from '~/shared/mixins/colorMixin'

export default {
  name: 'DxNavBarIcon',
  props: {
    isActive: {
      type: Boolean,
      default: () => false,
    },
    color: {
      Type: String,
      default: () => 'light'
    },
    width: {
      type: Number,
      default: () => 28
    },
    height: {
      type: Number,
      default: () => 20
    }
  },
  methods: {
    toggleClick() {
      this.$emit('onToggleMenu')
    },
  },
  mixins: [colorMixin]
}
</script>

<style lang='scss' scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  transition: $primary-transition;
}
.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
