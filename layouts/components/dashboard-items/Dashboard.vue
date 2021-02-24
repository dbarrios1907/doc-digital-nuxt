<template>
  <div>
    <v-row>
      <div :class="colclass">
        <dx-dashbitem hidecontent="true" class="pl-3 primary--text dashb-item" textheader="9.999" titleheader="Usuarios activos" messaje="" />
      </div>
    </v-row>
    <div class="mt-5 px-5 d-none d-sm-flex d-xs-none">
      <v-divider />
    </div>
    <v-row class="mt-3">
      <div :class="colclass">
        <dx-dashbitem class="pl-3 primary--text dashb-item" textheader="9.999" titleheader="Documentos enviados" messaje="" />
      </div>
      <v-divider inset vertical class="d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex mx-0 px-0 m" />
      <div :class="colclass">
        <dx-dashbitem class="primary--text dashb-item" textheader="9.999" titleheader="Documentos recibidos" messaje="15 pendientes de recibir" />
      </div>
      <v-divider inset vertical class="d-none d-md-flex d-lg-flex d-xl-flex mx-0 px-0" />
      <div :class="colclass">
        <dx-dashbitem class="primary--text dashb-item" textheader="9.999" titleheader="Documentos pendientes" messaje="" />
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'DxDashboard',
  inheritAttrs: false,
  computed: {
    colclass() {
      return window.innerWidth < 960 ? 'col-md-6' : 'col-md-4'
    },
  },
}
</script>
<style lang="scss">
.col-md-4 {
  max-width: 32% !important;
  min-width: 296px;
}
.col-md-6 {
  max-width: 49% !important;
  min-width: 296px;
}
.dashb-item {
  // min-width: 300px !important;
  max-width: 300px;
  margin: 0px auto;
}
</style>
