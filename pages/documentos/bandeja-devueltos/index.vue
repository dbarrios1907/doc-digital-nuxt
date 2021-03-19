<template>
  <DocumentTray :documentos="documentos"
                title="Documentos Devueltos"
                subtitle="Revisa tus documentos devueltos."
                empty-results="no tiene documentos devueltos"
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
