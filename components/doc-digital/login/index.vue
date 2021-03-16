<template>
  <dx-overlay-loader />
</template>
<script>
export default {
  name: 'Login',
  auth: false,
  layout: 'empty',
  fetch() {
    this.store.dispatch('action')
  },
  mounted() {
    this.$auth.loginWith('claveUnica', {})
  },
}
</script>
