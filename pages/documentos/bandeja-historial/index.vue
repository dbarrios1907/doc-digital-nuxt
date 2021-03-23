<template>
  <DocumentTray
    :documentos="documentos"
    title="Historial de documentos"
    subtitle="Revisa tu historial de documentos"
    empty-results="no existen documentos archivados"
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
