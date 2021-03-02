<template>
  <p>...loading</p>
</template>
<script>
export default {
  layout: 'loading',
  // fetchOnServer: false,
  async fetch() {
    console.log('ENTRO')
    // const loginUrl = await this.axios.get('https://api-docv3.test.digital.gob.cl/auth/url')
    // console.log(loginUrl)
    // this.loading = false
  },
  // async mounted(context) {
  //   // console.log(context)
  //   const loginUrl = await this.$axios.get('https://api-docv3.test.digital.gob.cl/auth/url')
  //   console.log(loginUrl)
  //   // context.loading = false
  // },
  created() {
    console.log('ON MOUNTED');
  },
  data: () => ({
    loginUrl: null,
  }),
}
</script>
