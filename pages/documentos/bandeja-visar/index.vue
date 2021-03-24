<template>
  <DocumentTray
    :documentos="documentos"
    title="Visar documentos"
    subtitle="Revisa tus documentos pendientes por visar."
    empty-results="no tiene documentos pendientes para visar"
  />
</template>

<script>
export default {
  async fetch() {
    await this.$store.dispatch('documents/getDocuments')
  },
  computed: {
    documentos() {
      return this.$store.getters['documents/getDocs']
    },
  },
}
</script>
