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
        <v-col cols="12" :class="['bg-grey1', 'pt-1', 'mb-10', { 'px-9': !ismobil }]">
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
          <v-row class="pb-9">
            <v-col cols="3">
              <dx-text-field
                v-model="search"
                flat
                solo
                outlined
                append-icon="mdi-magnify"
                placeholder="Escribe tu búsqueda"
                @input="updatefield('search', $event)"
              />
            </v-col>
            <v-col cols="3">
              <dx-filtermenu label="Filtrar" :items="filtermenu" @get-selected="get_selected"></dx-filtermenu>
            </v-col>
          </v-row>
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
                    <div class="py-7 v-data-footer bg-grey1">
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
    filtermenu: [...Array(4)].map((_, i) => `Texto de ejemplo  ${i}`),
    selected: [],
    search: '',
    hiddesearch: true,
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
        href: '/documentos/firmar-documento/details/1',
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
        tema: 'Instructivo de Modernización2',
        tipo: 'Oficio',
        folio: '-',
        creacion: '10-09-2020 9:58',
        actualizacion: '10-09-2020 9:58',
        href: '#',
      },
      {
        tema: 'Oficio ORD Permisos Administrativos2',
        tipo: 'Oficio',
        folio: '178',
        creacion: '10-09-2020 9:58',
        actualizacion: '10-09-2020 9:58',
        href: '#',
      },
      {
        tema: 'Circular normativa de Teletrabajo2',
        tipo: 'Oficio',
        folio: '-',
        creacion: '10-09-2020 9:58',
        actualizacion: '10-09-2020 9:58',
        href: '#',
      },
      {
        tema: 'Instructivo de Modernización3',
        tipo: 'Oficio',
        folio: '-',
        creacion: '10-09-2020 9:58',
        actualizacion: '10-09-2020 9:58',
        href: '#',
      },
      {
        tema: 'Oficio ORD Permisos Administrativos3',
        tipo: 'Oficio',
        folio: '178',
        creacion: '10-09-2020 9:58',
        actualizacion: '10-09-2020 9:58',
        href: '#',
      },
      {
        tema: 'Circular normativa de Teletrabajo3',
        tipo: 'Oficio',
        folio: '-',
        creacion: '10-09-2020 9:58',
        actualizacion: '10-09-2020 9:58',
        href: '#',
      },
    ],
  }),
  methods: {
    updatefield(key, data) {
      this[key] = data
    },
    get_selected(sel) {
      this.selected = sel
      console.log(this.selected)
    },
  },
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

  margin-bottom: 0;
}

@include theme(v-data-footer) using ($material) {
  border-top: none !important;
}

@include theme(v-tabs) using ($material) {
  .v-slide-group__content {
    background-color: #f5f5f5;
  }
}

@include theme(v-text-field) using($material) {
  border-radius: 0 !important;
  margin: 0;
}

@include theme(v-input) using($material) {
  .v-label {
    color: map-deep-get($material, 'colors', 'darken3') !important;
  }
}

@include theme(row) using($material) {
  .bg-grey1 {
    background-color: #f5f5f5;
  }
}
</style>
