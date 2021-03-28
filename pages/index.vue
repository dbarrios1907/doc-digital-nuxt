<template>
  <div>
    <v-row>
      <v-col cols="12" class="mt-3 mb-7 d-md-flex d-lg-flex d-xl-flex">
        <dx-bodytitle />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="pr-md-5">
        <header class="font-robotoslab font-25 weight-700 line-height-31 py-5">Hola {{ userName }}, ¡Ya estás en DocDigital!</header>

        <SectionPending v-if="hasNotifications" :visar="visar" :firmar="computedFirmar" :recibir="computedRecibir" />
        <dx-alert v-else class="mb-2" absolute centered type="success" :show-right-icon="false" :shadow="false">
          No tienes documentos pendientes
        </dx-alert>
      </v-col>
      <v-col cols="12" sm="12" md="4" class="mt-5 mt-md-0">
        <SectionLawInfo />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'

export default {
  data: () => ({
    visar: 0,
    firmar: 0,
    recibir: 0,
  }),
  computed: {
    hasNotifications() {
      // console.log( this.computedVisar > 0 || this.computedFirmar > 0 || this.computedRecibir > 0)
      return this.visar > 0 || this.computedFirmar > 0 || this.computedRecibir > 0
    },
    ...mapGetters(['userName']),
    computedVisar(){
      const getDocumentsCount = this.$store.getters['documents/getDocumentsCount'] 
      return getDocumentsCount('enviar')
    },
    computedFirmar(){
      const getDocumentsCount = this.$store.getters['documents/getDocumentsCount'] 
      return getDocumentsCount('firmar')
    },
    computedRecibir(){
      const getDocumentsCount = this.$store.getters['documents/getDocumentsCount']
      return getDocumentsCount('recibir')
    },
  },
  async fetch(){
    await this.$store.dispatch('documents/getDocumentsByInboxCount', 'recibir')
    await this.$store.dispatch('documents/getDocumentsByInboxCount', 'enviar')
    await this.$store.dispatch('documents/getDocumentsByInboxCount', 'firmar')
  }
}
</script>
