<template>
  <dx-overlay-loader />
</template>
<script>
export default {
  name: 'Login',
  auth: false,
  layout: 'empty',
  mounted() {
    this.$auth.loginWith('claveUnica', {})
  },
}
</script>
