<template>
  <DocumentTray
    :documentos="documentos"
    title="Firmar documentos"
    subtitle="Revisa tus documentos pendientes por firmar."
    empty-results="no tiene documentos pendientes para firmar"
    inboxurl="/documentos/bandeja-firmar/details/"
  >
    <template v-slot:actions>
      <v-icon dense> mdi-eye </v-icon>
      <pencil-sign-icon class="mx-4" />
      <v-icon dense> mdi-close </v-icon>
    </template>
  </DocumentTray>
</template>

<script>
export default {
  fetch() {
    this.$store.dispatch('documents/getDocuments', 'firmar')
  },
  computed: {
    documentos() {
      return this.$store.getters['documents/getDocs']
    },
  },
}
</script>
