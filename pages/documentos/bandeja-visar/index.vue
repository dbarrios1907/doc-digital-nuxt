<template>
  <DocumentTray
    :documentos="documentos"
    title="Visar documentos"
    subtitle="Revisa tus documentos pendientes por visar."
    empty-results="no tiene documentos pendientes para visar"
    inboxurl="/documentos/bandeja-visar/details/"
  >
    <template v-slot:actions>
      <v-icon dense> mdi-eye </v-icon>
      <visar-icon class="mx-4" />
      <v-icon dense> mdi-close </v-icon>
    </template>
  </DocumentTray>
</template>

<script>
export default {
  fetch() {
    this.$store.dispatch('documents/getDocuments', 'visar')
  },
  computed: {
    documentos() {
      return this.$store.getters['documents/getDocs']
    },
  },
}
</script>
