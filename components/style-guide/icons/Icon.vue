<template>
  <v-icon :style="regular && { fontSize: '24px' }" v-bind="$attrs" v-on="$listeners">
    <slot />
  </v-icon>
</template>

<script>
export default {
  name: 'DxIcon',
  inheritAttrs: false,
  props: {
    regular: Boolean,
  },
}
</script>

<style lang="scss">
.theme--light.v-icon {
  color: map-get($material-light, 'font-color');
}
.theme--dark.v-icon {
  color: map-get($material-light, 'font-color');
}
</style>
