<template>
  <DocumentTray :documentos="documentos" title="Oficina de partes" subtitle="Revisa tu documentos" empty-results="no existen documentos archivados" />
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
