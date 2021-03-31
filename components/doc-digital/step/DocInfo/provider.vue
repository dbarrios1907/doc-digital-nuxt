<template>
  <StepDocInfo v-bind="$attrs" :document-type-options="documentTypeOptions" :document="document" v-on="$listeners" />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'StepDocInfoProvider',
  inheritAttrs: false,
  computed: {
    ...mapGetters('documents', ['documentTypeOptions', 'documentFileOptions', 'document']),
  },
  mounted() {
    console.log(document)
    this.$store.dispatch('documents/fetchDocumentTypeOptions')
    this.$store.dispatch('documents/fetchFileTypeOptions')
  },
}
</script>
