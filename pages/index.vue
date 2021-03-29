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

        <SectionPending v-if="hasNotifications" :visar="pedientesVisar" :firmar="pendientesFirmar" :recibir="pendientesOpRecibir" />
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
  computed: {
    hasNotifications() {
      return this.pedientesVisar > 0 || this.pendientesOpRecibir > 0 || this.pendientesFirmar > 0
    },
    ...mapGetters(['userName']),
    ...mapState(['pedientesVisar', 'pendientesOpRecibir', 'pendientesFirmar']),
  },
  async fetch() {
    //await this.$store.dispatch('fetchUserDashboard')
  },
}
</script>
