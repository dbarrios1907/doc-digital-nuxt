<template>
  <dx-overlay-loader />
</template>
<script>
import { fetchLoginUrl } from '~/api/login'
import { isBrowser } from '~/shared/utils/env'

export default {
  name: 'Login',
  auth: false,
  layout: 'empty',
  async fetch() {
    this.loginUrl = await fetchLoginUrl(fetch)
    // if (isBrowser) window.open(this.loginUrl, '_self')
    if (isBrowser) window.location.href = this.loginUrl
  },
  data: () => ({
    loginUrl: null,
  }),
  mounted() {
    // if (isBrowser) window.open(this.loginUrl, '_self')
    if (isBrowser) window.location.href = this.loginUrl
  },
}
</script>
