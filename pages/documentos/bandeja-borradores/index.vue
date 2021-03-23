<template>
  <DocumentTray :documentos="documentos"
                title="Borradores de documentos"
                subtitle="Revisa tus borradores"
                empty-results="no tiene borradores de documentos"
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
