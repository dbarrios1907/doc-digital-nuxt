<template>
  <ForbiddenAccess :message="message" />
</template>
<script>
export default {
  auth: false,
  layout: 'empty',
  data() {
    return {
      message: this.$auth.$storage.getUniversal('route.message'),
    }
  },
}
</script>
