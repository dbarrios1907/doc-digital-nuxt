<template>
  <DocumentTray
    :documentos="documentos"
    title="Borradores de documentos"
    subtitle="Revisa tus borradores"
    empty-results="no tiene borradores de documentos"
    inboxurl="/documentos/bandeja-borradores/details/"
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
