<template>
  <DocumentTray
    :documentos="documentos"
    title="Historial de documentos"
    subtitle="Revisa tu historial de documentos"
    empty-results="no existen documentos archivados"
    inboxurl="/documentos/bandeja-historial/details/"
  >
    <template v-slot:actions>
      <v-icon dense> mdi-eye </v-icon>
      <v-icon dense>mdi-square-edit-outline</v-icon>
      <v-icon dense> mdi-close </v-icon>
    </template>
  </DocumentTray>
</template>

<script>
export default {
  fetch() {
    this.$store.dispatch('documents/getDocuments', '')
  },
  computed: {
    documentos() {
      return this.$store.getters['documents/getDocs']
    },
  },
}
</script>
