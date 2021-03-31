<template>
  <div>
    <DocumentTray
      inbox="firmar"
      title="Firmar documentos"
      subtitle="Revisa tus documentos pendientes por firmar."
      empty-results="no tiene documentos pendientes para firmar"
      inboxurl="/documentos/bandeja-firmar/details/"
    >
      <template v-slot:actionsPrimary>
        <dx-button color="primary" outlined>
          <dx-icon right regular> mdi-download </dx-icon>
          <span class="ml-2 text-underline">Descargar documento</span>
        </dx-button>
      </template>
      <template v-slot:actions="{ docid }">
        <v-icon dense @click="openDetails(docid)"> mdi-eye </v-icon>
        <pencil-sign-icon class="mx-4" aria-controls @click="getid('dialog2', docid)" />
        <v-icon dense @click="getid('dialog1', docid)"> mdi-close </v-icon>
      </template>
    </DocumentTray>
    <DocumentDetailDialog :dialog="dialog_d" :items="details" headTitle="Documento">
      <template v-slot:actions>
        <dx-button color="primary" outlined v-bind="$props" class="text-none">
          <span class="text-underline"> Editar </span>
        </dx-button>
        <dx-button color="white" outlined v-bind="$props" class="text-none ml-4 mr-2 primary" @click="dialog_d = false">
          <span class="text-underline"> Cerrar </span>
        </dx-button>
      </template>
    </DocumentDetailDialog>
    <DocumentDetailModalRechazar :docid="docid" v-model="dialog1" @onClose="dialog1 = false" @onCancel="dialog1 = false" />
    <DocumentDetailModalFirmar :docid="docid" v-model="dialog2" @onClose="dialog2 = false" @onCancel="dialog2 = false" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog_d: false,
      details: [],
      dialog1: false,
      dialog2: false,
      docid: '',
    }
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
