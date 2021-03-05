<template>
  <dx-overlay-loader :value="_loading" />
</template>
<script>
import { mapState } from 'vuex'

export default {
  layout: 'empty',
  auth: false,
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapState(['auth.loggedIn']),
    _loading() {
      return this.$auth.$state.loggedIn
    },
  },
  mounted() {
    console.log(this.$auth.$state)
  },
}
</script>
