<template>
  <div>
    <v-row>
      <dx-dashbitem hidecontent="true" class="pl-3 pr-10 primary--text col-md-4" textheader="9.999" titleheader="Usuarios activos" messaje="" />
    </v-row>
    <div class="mt-5 px-5 d-none d-sm-flex d-xs-none">
      <v-divider />
    </div>
    <v-row class="mt-3">
      <dx-dashbitem class="pl-3 pr-10 primary--text col-md-4 min-width-200" textheader="9.999" titleheader="Documentos enviados" messaje="" />
      <v-divider inset vertical class="d-none d-sm-flex d-xs-none mx-0 px-0" />
      <dx-dashbitem
        class="px-12 primary--text col-md-4 min-width-200"
        textheader="9.999"
        titleheader="Documentos recibidos"
        messaje="15 pendientes de recibir"
      />
      <v-divider inset vertical class="d-none d-sm-flex mx-0 d-xs-none px-0" />
      <dx-dashbitem class="px-10 primary--text col-md-4 min-width-200" textheader="9.999" titleheader="Documentos pendientes" messaje="" />
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'DxDashboard',
  inheritAttrs: false,
}
</script>
<style scoped>
.col-md-4 {
  max-width: 32% !important;
  min-width: 296px;
}
</style>
