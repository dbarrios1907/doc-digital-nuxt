<template>
  <StepVisa v-bind="$attrs" :visa-options="visaOptions" v-on="$listeners" />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'StepVisaProvider',
  inheritAttrs: false,
  computed: {
    ...mapGetters('documents', ['visaOptions']),
  },
  mounted() {
    this.$store.dispatch('documents/fetchVisaOptions')
  },
}
</script>
