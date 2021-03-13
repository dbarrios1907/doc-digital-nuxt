<template>
  <v-row>
    <div :class="['px-0', { 'col-12': isMovileScreen, 'col-9': !isMovileScreen }]">
      <slot name="title" />
      <slot name="subtitle" />
    </div>
    <dx-icons-actions class="text-right float-right col-3 d-none d-sm-block mt-1 px-0" />
  </v-row>
</template>

<script>
export default {
  name: 'DxBodytitle',
  inheritAttrs: false,
  computed: {
    isMovileScreen() {
      return this.$vuetify.breakpoint.xs
    },
  },
}
</script>
<style scoped></style>
