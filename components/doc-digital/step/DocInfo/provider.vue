<template>
  <StepDocInfo v-bind="$attrs" :document-type-options="documentTypeOptions" v-on="$listeners" />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'StepDocInfoProvider',
  inheritAttrs: false,
  computed: {
    ...mapGetters('documents', ['documentTypeOptions', 'documentFileOptions']),
  },
  mounted() {
    this.$store.dispatch('documents/fetchDocumentTypeOptions')
    this.$store.dispatch('documents/fetchFileTypeOptions')
  },
}
</script>
