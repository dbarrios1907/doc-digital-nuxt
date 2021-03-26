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

        <SectionPending v-if="hasNotifications" :visar="visar" :firmar="firmar" :recibir="recibir" />
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
export default {
  data: () => ({
    userName: 'Daniel Barrios',
    visar: 123,
    firmar: 1,
    recibir: 5,
  }),
  computed: {
    hasNotifications() {
      return this.visar > 0 && this.firmar > 0 && this.recibir > 0
    },
  },
}
</script>
