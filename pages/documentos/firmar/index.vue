<template>
  <div>
    <v-row>
      <perfect-scrollbar :style="{ height: '100%', width: '100%' }">
        <v-col cols="12" class="mt-3 mb-7 d-none d-md-flex d-lg-flex d-xl-flex">
          <dx-bodytitle>
            <template v-slot:title>
              <div class="weight-700 font-25 line-height-31">Firmar</div>
            </template>
            <template v-slot:subtitle>
              <div class="weight-400 mt-3 font-regular line-height-24">Revisa tus documentos pendientes por firmar.</div>
            </template>
          </dx-bodytitle>
        </v-col>
        <v-col cols="12" :class="['bg-grey1', 'mb-10', { 'px-9': !ismobil }]">
          <div class="my-9 weight-400">
            <span class="mr-2">Mostrando hasta</span>
            <v-select
              class="d-inline-flex min-content"
              :items="options"
              label="Selección Simple"
              value="10"
              solo
              flat
              outlined
              v-bind="$props"
              ripple="false"
              single-line
            ></v-select>
            <span class="ml-3">resultados de un total de <b>3 documentos pendientes por firmar</b>.</span>
          </div>
          <dx-tabs :items="tabs" tabtype="primary">
            <template v-slot:tab-item>
              <v-tab-item v-for="item in items" :key="item.tab">
                <DataTable
                  color="primary"
                  :headers="computedHeaders"
                  :items="valuess"
                  :page.sync="page"
                  :items-per-page="itemsPerPage"
                  :class="['bold', 'actions1', 'table-xl', { 'icon-sort-left': isleft }, { ismobile: ismobil }]"
                  :mobile-breakpoint="0"
                  hide-default-footer
                  item-key="tema"
                  @page-count="pageCount = $event"
                >
                  <template v-slot:[`item.tema`]="{ item: { tema, href } }" class="column">
                    <a class="breaktext" :href="href">{{ tema }}</a>
                  </template>

                  <template v-slot:[`item.access`]="{ item: { access } }">
                    <v-chip v-for="v in access" :key="v" class="ml-2" color="primary" small>
                      {{ v }}
                    </v-chip>
                  </template>

                  <template v-slot:[`item.actions`]>
                    <v-icon dense :class="[{ 'mr-4': !ismobil }]"> mdi-eye </v-icon>
                  </template>

                  <template v-slot:footer>
                    <div class="py-7 v-data-footer">
                      <dx-pagination v-model="page" :length="pageCount" />
                    </div>
                  </template>
                </DataTable>
              </v-tab-item>
            </template>
          </dx-tabs>
        </v-col>
      </perfect-scrollbar>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    options: ['10', '20', '30'],
    tabs: [{ tab: 'Pendientes', number: 5 }],
    items: ['Administrador', 'otro'],
    isleft: true,
    page: 1,
    pageCount: 0,
    itemsPerPage: 6,
    valuess: [
      {
        tema: 'Instructivo de Modernización',
        tipo: 'Oficio',
        folio: '-',
        creacion: '10-09-2020 9:58',
        actualizacion: '10-09-2020 9:58',
        href: '#',
      },
      {
        tema: 'Oficio ORD Permisos Administrativos',
        tipo: 'Oficio',
        folio: '178',
        creacion: '10-09-2020 9:58',
        actualizacion: '10-09-2020 9:58',
        href: '#',
      },
      {
        tema: 'Circular normativa de Teletrabajo',
        tipo: 'Oficio',
        folio: '-',
        creacion: '10-09-2020 9:58',
        actualizacion: '10-09-2020 9:58',
        href: '#',
      },
      {
        tema: 'Instructivo de Modernización',
        tipo: 'Oficio',
        folio: '-',
        creacion: '10-09-2020 9:58',
        actualizacion: '10-09-2020 9:58',
        href: '#',
      },
      {
        tema: 'Oficio ORD Permisos Administrativos',
        tipo: 'Oficio',
        folio: '178',
        creacion: '10-09-2020 9:58',
        actualizacion: '10-09-2020 9:58',
        href: '#',
      },
      {
        tema: 'Circular normativa de Teletrabajo',
        tipo: 'Oficio',
        folio: '-',
        creacion: '10-09-2020 9:58',
        actualizacion: '10-09-2020 9:58',
        href: '#',
      },
      {
        tema: 'Instructivo de Modernización',
        tipo: 'Oficio',
        folio: '-',
        creacion: '10-09-2020 9:58',
        actualizacion: '10-09-2020 9:58',
        href: '#',
      },
      {
        tema: 'Oficio ORD Permisos Administrativos',
        tipo: 'Oficio',
        folio: '178',
        creacion: '10-09-2020 9:58',
        actualizacion: '10-09-2020 9:58',
        href: '#',
      },
      {
        tema: 'Circular normativa de Teletrabajo',
        tipo: 'Oficio',
        folio: '-',
        creacion: '10-09-2020 9:58',
        actualizacion: '10-09-2020 9:58',
        href: '#',
      },
    ],
  }),
  computed: {
    ismobil() {
      return this.$vuetify.breakpoint.xs
    },
    computedHeaders() {
      return this.headers.filter(h => (this.$vuetify.breakpoint.xs ? h.value == 'tema' || h.value == 'actions' : h.value))
    },
    headers() {
      return [
        {
          text: 'Tema',
          align: 'start',
          value: 'tema',
          sortable: true,
        },
        { text: 'Tipo', value: 'tipo', sortable: true },
        { text: 'Folio', value: 'folio', sortable: true },
        { text: 'Creación', value: 'creacion', sortable: true },
        { text: 'Actualización', value: 'actualizacion', sortable: true },
        { text: 'Ver', value: 'actions', sortable: false },
      ]
    },
  },
}
</script>
<style lang="scss">
@include theme(v-select) using ($material) {
  width: rem-calc(104px) !important;
  height: rem-calc(48px) !important;
}

@include theme(v-data-footer) using ($material) {
  border-top: none !important;
}

@include theme(v-tabs) using ($material) {
  .v-slide-group__content {
    background-color: #f5f5f5;
  }
}

.bg-grey1 {
  background-color: #f5f5f5;
}
</style>
