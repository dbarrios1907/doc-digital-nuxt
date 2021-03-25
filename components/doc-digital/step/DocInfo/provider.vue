<template>
  <StepDocInfo v-bind="$attrs" :document-type-options="documentTypeOptions" :document-subject-options="documentSubjectOptions" v-on="$listeners" />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'StepDocInfoProvider',
  inheritAttrs: false,
  computed: {
    ...mapGetters('documents', ['documentTypeOptions', 'documentSubjectOptions']),
  },
  mounted() {
    this.$store.dispatch('documents/fetchDocumentTypeOptions')
    this.$store.dispatch('documents/fetchDocumentSubjectOptions')
  },
}
</script>
