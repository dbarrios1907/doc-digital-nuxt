<template>
  <DocumentTray
    :documentos="documentos"
    title="Firmar documentos"
    subtitle="Revisa tus documentos pendientes por firmar."
    empty-results="no tiene documentos pendientes para firmar"
  />
</template>

<script>
export default {
  fetch() {
    this.$store.dispatch('documents/getDocuments')
  },
  computed: {
    documentos() {
      return this.$store.getters['documents/getDocs']
    },
  },
}
</script>
