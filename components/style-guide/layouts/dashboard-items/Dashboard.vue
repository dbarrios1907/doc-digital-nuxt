<template>
  <div dx-dashboard>
    <v-row>
      <div :class="colclass">
        <dx-dashbitem hidecontent="true" class="primary--text dashb-item ml-0" textheader="9.999" titleheader="Usuarios activos" messaje="" />
      </div>
    </v-row>
    <div class="mt-5 px-5 d-none d-sm-flex d-xs-none">
      <v-divider />
    </div>
    <v-row class="mt-3">
      <div :class="colclass" class="relative with-v-divider">
        <dx-dashbitem class="primary--text dashb-item ml-0" textheader="9.999" titleheader="Documentos enviados" messaje="" />
      </div>
      <div :class="colclass" class="relative with-v-divider">
        <dx-dashbitem
          class="primary--text dashb-item m-auto"
          textheader="9.999"
          titleheader="Documentos recibidos"
          messaje="15 pendientes de recibir"
        />
      </div>
      <div :class="colclass">
        <dx-dashbitem class="primary--text dashb-item ml-0" textheader="9.999" titleheader="Documentos pendientes" messaje="" />
      </div>
    </v-row>
  </div>
</template>

<script>
import { isBrowser } from '~/shared/utils/env'

export default {
  name: 'DxDashboard',
  inheritAttrs: false,
  computed: {
    colclass() {
      return 'col-sm-12 col-md-6 col-lg-4'
    },
  },
}
</script>
<style lang="scss" scoped>
[dx-dashboard] {
  .relative {
    position: relative;
  }
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
    margin: 0 auto;
    position: relative;
  }
  .with-v-divider:after {
    content: '';
    top: -10px;
    right: 20px;
    position: absolute;
    height: calc(100% - 10px);
    margin: 20px 0;
    border-right: 1px solid rgba(0, 0, 0, 0.12);
  }
}
</style>
