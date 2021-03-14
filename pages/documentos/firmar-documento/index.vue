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
            <dx-select class="d-inline-flex min-content" :items="options" :label="itempage"></dx-select>
            <span class="ml-3">resultados de un total de <b>3 documentos pendientes por firmar</b>.</span>
          </div>

          <div v-if="emptyfilter && filtered">
            <v-row class="mb-2">
              <v-col cols="12">
                <dx-badge type="tertiary" label outlined class="mx-0 my-0 mr-3" v-if="tema">
                  <div class="darken3--text font-16 line-height-22 weight-400">Tema</div>
                  <dx-icon left class="darken3--text ml-2 mr-0" @click.prevent="updatefield('tema', '')"> mdi-close </dx-icon>
                </dx-badge>

                <dx-badge type="tertiary" label outlined class="mx-0 my-0 mr-3" v-if="tipo">
                  <div class="darken3--text font-16 line-height-22 weight-400">Tipo</div>
                  <dx-icon left class="darken3--text ml-2 mr-0" @click.prevent="updatefield('tipo', '')"> mdi-close </dx-icon>
                </dx-badge>

                <dx-badge type="tertiary" label outlined class="mx-0 my-0 mr-3" v-if="folio">
                  <div class="darken3--text font-16 line-height-22 weight-400">Folio</div>
                  <dx-icon left class="darken3--text ml-2 mr-0" @click.prevent="updatefield('folio', '')"> mdi-close </dx-icon>
                </dx-badge>

                <dx-badge type="tertiary" label outlined class="mx-0 my-0 mr-3" v-if="picker1 || picker2">
                  <div class="darken3--text font-16 line-height-22 weight-400">Creación</div>
                  <dx-icon
                    left
                    class="darken3--text ml-2 mr-0"
                    @click.prevent="
                      updatefield('picker1', '')
                      updatefield('picker2', '')
                    "
                  >
                    mdi-close
                  </dx-icon>
                </dx-badge>

                <dx-badge type="tertiary" label outlined class="mx-0 my-0 mr-3" v-if="picker3 || picker4">
                  <div class="darken3--text font-16 line-height-22 weight-400">Actualización</div>
                  <dx-icon
                    left
                    class="darken3--text ml-2 mr-0"
                    @click.prevent="
                      updatefield('picker3', '')
                      updatefield('picker4', '')
                    "
                  >
                    mdi-close
                  </dx-icon>
                </dx-badge>
              </v-col>
            </v-row>

            <v-row class="mb-5">
              <v-col>
                <dx-button
                  color="primary"
                  outlined
                  class="text-none mr-3"
                  @click="
                    dialog = false
                    cancelar()
                  "
                >
                  <span class="text-underline"> Limpiar </span>
                </dx-button>

                <dx-button
                  color="primary"
                  outlined
                  class="text-none"
                  @click="
                    dialog = true
                    cancelar()
                  "
                >
                  <span class="text-underline"> Buscar otro documento </span>
                </dx-button>
              </v-col>
              <v-col class="text-right">
                <dx-button color="transparent" class="link">
                  <csv-down-icon />
                  <span class="ml-2 text-underline primary--text">Firmar documento</span>
                </dx-button>
              </v-col>
            </v-row>
          </div>
          <v-row v-else class="pb-9">
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
              <dx-button color="darken3" outlined @click="dialog = true" class="filter">
                <div class="text-underline float-left">Filtrar</div>
                <dx-icon right regular class="text-right float-right"> mdi-filter </dx-icon>
              </dx-button>
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
    <v-dialog overlay-opacity="0.55" overlay-color="#001C41" v-model="dialog" max-width="960px" :class="[{ ismobil: ismobil }]">
      <v-card>
        <v-card-title>
          <h5 class="font-title weight-700 darken3--text">Buscar documento por firmar</h5>
          <v-spacer></v-spacer>
          <v-btn color="darken3" icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider class="darken1"></v-divider>

        <v-card-text class="font-roboto weight-400 line-height-30 font-title darken3--text py-10 px-10">
          <div class="font-title line-height-30 mb-10">
            Complete <b>el o los campos necesarios</b> para realizar la búsqueda del documento que desea.
          </div>

          <v-row class="mt-3">
            <v-col cols="4">
              <span>Tema o materia:</span>
              <dx-text-field v-model="tema" flat solo outlined placeholder="Escriba el tema/materia" />
            </v-col>
            <v-col cols="4">
              <span>Tipo: </span>
              <dx-select v-model="tipo" :items="doctype" label="Selecciona el tipo" />
            </v-col>
            <v-col cols="4">
              <span>Folio:</span>
              <dx-text-field v-model="folio" flat solo outlined placeholder="Escriba el folio" />
            </v-col>
          </v-row>

          <div class="mt-8">
            <div class="weight-700 darken3--text font-regular mb-3">Creación</div>
            <div class="d-inline-block">Desde:</div>
            <div class="d-inline-block mx-5 datepicker">
              <dx-date-picker v-model="picker1" no-title color="primary" cleared />
            </div>
            <div class="d-inline-block">Hasta:</div>
            <div class="d-inline-block mx-5 datepicker">
              <dx-date-picker v-model="picker2" no-title color="primary" cleared />
            </div>
          </div>

          <div class="mt-8">
            <div class="weight-700 darken3--text font-regular mb-3">Actualización</div>
            <div class="d-inline-block">Desde:</div>
            <div class="d-inline-block mx-5 datepicker">
              <dx-date-picker v-model="picker3" no-title color="primary" cleared />
            </div>
            <div class="d-inline-block">Hasta:</div>
            <div class="d-inline-block mx-5 datepicker">
              <dx-date-picker v-model="picker4" no-title color="primary" cleared />
            </div>
          </div>
        </v-card-text>

        <v-card-actions class="px-10 pb-10">
          <v-spacer></v-spacer>
          <dx-button
            color="primary"
            outlined
            class="text-none"
            @click="
              dialog = false
              cancelar()
            "
          >
            <span class="text-underline"> Cancelar </span>
          </dx-button>
          <dx-button color="primary" class="text-none ml-5" @click="buscar">
            <span class="text-underline"> Buscar </span>
          </dx-button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    picker1: '',
    picker2: '',
    picker3: '',
    picker4: '',
    tema: '',
    tipo: '',
    folio: '',
    options: ['10', '20', '30'],
    itempage: '10',
    doctype: ['Oficio', 'otro'],
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
    filtered: false,
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
  methods: {
    updatefield(key, data) {
      this[key] = data
    },
    buscar() {
      this.dialog = false
      this.filtered = true
    },
    cancelar() {
      this.picker1 = ''
      this.picker2 = ''
      this.picker3 = ''
      this.picker4 = ''
      this.tema = ''
      this.tipo = ''
      this.folio = ''
      this.filtered = false
    },
    temaFilter(value) {
      if (!this.tema || !this.filtered) {
        return true
      }
      return value.toLowerCase().includes(this.tema.toLowerCase())
    },
    tipoFilter(value) {
      if (!this.tipo || !this.filtered) {
        return true
      }
      return value.includes(this.tipo)
    },
    folioFilter(value) {
      if (!this.folio || !this.filtered) {
        return true
      }
      return value.includes(this.folio)
    },
    between(from, to, current) {
      if (!from || !from || !this.filtered) {
        return true
      }
      let from_ = new Date(from)
      let to_ = new Date(to)
      let current_ = new Date(current)
      return current_ >= from_ && current_ <= to_
    },
    creacionFilter(value) {
      return this.between(this.picker1, this.picker2, value)
    },
    actualizacionFilter(value) {
      return this.between(this.picker3, this.picker4, value)
    },
  },
  computed: {
    emptyfilter() {
      return this.picker1 || this.picker2 || this.picker3 || this.picker1 || this.tema || this.tipo || this.tema || this.folio
    },
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
          filter: this.temaFilter,
        },
        { text: 'Tipo', value: 'tipo', sortable: true, filter: this.tipoFilter },
        { text: 'Folio', value: 'folio', sortable: true, filter: this.folioFilter },
        { text: 'Creación', value: 'creacion', sortable: true, filter: this.creacionFilter },
        { text: 'Actualización', value: 'actualizacion', sortable: true, filter: this.actualizacionFilter },
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

  .datepicker {
    width: rem-calc(117px);
  }
}

@include theme(row) using($material) {
  .bg-grey1 {
    background-color: #f5f5f5;
  }

  .filter {
    width: 100%;
    .v-btn__content {
      justify-content: normal;
      .v-icon {
        position: absolute;
        right: 0;
      }
    }
  }
}
@include theme(v-dialog) using($material) {
  .v-select {
    width: 100% !important;
    height: 100% !important;
  }

  .datepicker .v-input {
    width: rem-calc(200px) !important;
  }
}
@include theme(v-btn) using($material) {
  &.link {
    padding: 0;
    &:hover::before {
      opacity: 0;
    }
  }
}
</style>
