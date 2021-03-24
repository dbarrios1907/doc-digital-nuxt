<template>
  <div class="d-flex align-center justify-center fill-height">
    <ErrorPage />
  </div>
</template>
<script>
export default {
  auth: false,
  props: ['error'],
  layout: 'empty',
  mounted() {
    console.log(this)
    console.log(this.error)
  },
}
</script>
