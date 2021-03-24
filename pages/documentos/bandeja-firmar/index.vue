<template>
  <div>
    <DocumentTray
      :documentos="documentos"
      label="Firmar documentos"
      sublabel="Revisa tus documentos pendientes por firmar."
      empty-results="no tiene documentos pendientes para firmar"
      inboxurl="/documentos/bandeja-firmar/details/"
    >
      <template v-slot:actions="{ docid }">
        <v-icon dense @click="openDetails(docid)"> mdi-eye </v-icon>
        <pencil-sign-icon class="mx-4" />
        <v-icon dense @click="confirmDeleteDoc(docid)"> mdi-close </v-icon>
      </template>
    </DocumentTray>
    <DialogDetail :dialog="dialog_d" :items="details" headTitle="Documento">
        <template v-slot:actions>
            <dx-button color="primary" outlined v-bind="$props" class="text-none">
                <span class="text-underline"> Editar </span>
            </dx-button>
            <dx-button color="white" outlined v-bind="$props" class="text-none ml-4 mr-2 primary" @click="dialog_d = false">
                <span class="text-underline"> Cerrar </span>
            </dx-button>
        </template>
    </DialogDetail>
    <DialogConfirmation :dialog="dialog_c" headTitle="¿Realmente desea eliminar este documento?">
        <template v-slot:actions>
            <dx-button color="white" outlined v-bind="$props" class="text-none ml-4 mr-2 primary" @click="deleteDocument">
                <span class="text-underline"> Aceptar </span>
            </dx-button>
            <dx-button color="primary" outlined v-bind="$props" class="text-none" @click="dialog_c = false">
                <span class="text-underline"> Cancelar </span>
            </dx-button>
        </template>
    </DialogConfirmation>
  </div>
</template>

<script>
export default {
  fetch() {
    this.$store.dispatch('documents/getDocuments', 'firmar')
  },
  data(){
    return {
      dialog_d:false,
      dialog_c:false,
      docid: '',
      details:[]

    }
  },
  computed: {
    documentos() {
      return this.$store.getters['documents/getDocs']
    },
  },
  methods:{
    async openDetails(id){
      let doc = await this.$store.dispatch('documents/getDocument', id)
      if(doc){
        this.dialog_d = true
        this.details = [
                {
                  label: 'Tema: ',
                  value: doc.materia,
                },
                {
                  label: 'Descripción: ',
                  value: doc.descripcion,
                },
                {
                  label: 'Hacer seguimiento: ',
                  value: doc.isFirmado ? "Activo" : 'No activo',
                },
                {
                  label: 'Reservado: ',
                  value: doc.isReservado ? 'Si' : 'No: ',
                },
                {
                  label: 'Tipo de documento: ',
                  value: doc.tipoDocumentoOficial ? doc.tipoDocumentoOficial.descripcion : '',
                },
                {
                  label: 'Anexos: ',
                  value: (doc.anexos ? doc.anexos.length : 0) > 0 ? 'Si tiene' : 'No tiene',
                },
                {
                  label: 'Página de firma: ',
                  value: 'Primera',
                },
          ]
      }
    },
    confirmDeleteDoc(docid){
      this.docid = docid
      this.dialog_c = true
    },
    async deleteDocument(){
      let resp = await this.$store.dispatch('documents/deleteDocument', this.docid)
      if(resp){
          this.dialog_c = false
          this.docid= ''
      }
    }
  }
}
</script>
