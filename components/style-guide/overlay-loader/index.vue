<template>
  <v-overlay dx-overlay-loader :value="loading">
    <p class="dx-loader-msg">{{ message }}</p>
    <v-progress-circular indeterminate size="64" />
  </v-overlay>
</template>
<script>
export default {
  name: 'DxOverlayLoader',
  props: {
    message: {
      type: String,
      default: () => 'Cargando',
    },
    loading: {
      type: Boolean,
      default: () => true,
    },
  },
}
</script>
<style lang="scss" scoped>
[dx-overlay-loader] {
  .dx-loader-msg {
    position: relative;
    bottom: 10px;
  }
}
</style>
