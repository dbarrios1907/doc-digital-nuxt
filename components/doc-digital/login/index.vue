<template>
  <dx-overlay-loader />
</template>
<script>
// import { fetchLoginUrl } from '~/api/login'
import { isBrowser } from '~/shared/utils/env'

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
