<template>
  <DocumentTray
    :documentos="documentos"
    title="Documentos Pendientes"
    subtitle="Revisa tus documentos pendientes"
    empty-results="no existen documentos pendientes"
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
