<template>
  <div>
    <DocumentTray
      :documentos="documentos"
      title="Documentos Devueltos"
      subtitle="Revisa tus documentos devueltos."
      empty-results="no tiene documentos devueltos"
      inboxurl="/documentos/bandeja-devueltos/details/"
    >
      <template v-slot:actions="{ docid }">
        <v-icon dense @click="openDetails(docid)"> mdi-eye </v-icon>
        <v-icon dense>mdi-square-edit-outline</v-icon>
        <v-icon dense> mdi-close </v-icon>
      </template>
    </DocumentTray>
    <DocumentDetailDialog :dialog="dialog_d" :items="details" headTitle="Documento">
      <template v-slot:actions>
        <dx-button color="white" outlined v-bind="$props" class="text-none ml-4 mr-2 primary" @click="dialog_d = false">
          <span class="text-underline"> Cerrar </span>
        </dx-button>
      </template>
    </DocumentDetailDialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog_d: false,
      details: [],
      docid: '',
    }
  },
  fetch() {
    this.$store.dispatch('documents/getDocuments', 'creacion/rechazadas')
  },
  computed: {
    documentos() {
      return this.$store.getters['documents/getDocs']
    },
  },
  methods: {
    getid(name, id) {
      this.docid = id.toString()
      this[name] = true
    },
    async openDetails(id) {
      let doc = await this.$store.dispatch('documents/fetchDocument', id)
      if (doc) {
        this.dialog_d = true
        this.details = [
          {
            title: 'Tema',
            description: doc.materia,
          },
          {
            title: 'Descripción',
            description: doc.descripcion,
          },
          {
            name: 'switch',
            title: 'Hacer seguimiento',
            status: doc.isFirmado,
          },
          {
            title: 'Reservado',
            description: doc.isReservado ? 'Si' : 'No',
          },
          {
            title: 'Tipo de documento',
            description: doc.tipoDocumentoOficial ? doc.tipoDocumentoOficial.descripcion : '',
          },
          {
            title: 'Anexos',
            description: (doc.anexos ? doc.anexos.length : 0) > 0 ? 'Si tiene' : 'No tiene',
          },
          {
            title: 'Página de firma',
            description: 'Primera',
          },
        ]
      }
    },
  },
}
</script>
