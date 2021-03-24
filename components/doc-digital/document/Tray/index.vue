<template>
  <div>
    <v-row>
      <perfect-scrollbar :style="{ height: '100%', width: '100%' }">
        <v-col cols="12" class="mt-3 mb-7 d-md-flex d-lg-flex d-xl-flex">
          <dx-bodytitle>
            <template v-slot:title>
              <div class="weight-700 font-25 line-height-31">{{ title }}</div>
            </template>
            <template v-slot:subtitle>
              <div class="weight-400 mt-3 font-regular line-height-24">{{ subtitle }}</div>
            </template>
          </dx-bodytitle>
        </v-col>
        <v-col cols="12" class="bg-grey1 px-md-9 pt-1 mb-10">
          <div class="my-9 weight-400">
            <span class="mr-2">Mostrando hasta</span>
            <dx-select v-model="itemsPerPage" class="d-inline-flex min-content mb-md-3" :items="options" :label="itemsPerPage.toString()" />
            <span class="ml-md-3"
              >resultados de un total de <b>{{ documentos.length }} documentos pendientes</b>.</span
            >
          </div>

          <div v-if="emptyfilter && filtered">
            <v-row class="mb-2">
              <v-col cols="12">
                <dx-badge v-if="tema" type="tertiary" label outlined class="mx-0 my-0 mr-3">
                  <div class="darken3--text font-16 line-height-22 weight-400">Tema</div>
                  <dx-icon left class="darken3--text ml-2 mr-0" @click.prevent="updatefield('tema', '')"> mdi-close </dx-icon>
                </dx-badge>

                <dx-badge v-if="tipo" type="tertiary" label outlined class="mx-0 my-0 mr-3">
                  <div class="darken3--text font-16 line-height-22 weight-400">Tipo</div>
                  <dx-icon left class="darken3--text ml-2 mr-0" @click.prevent="updatefield('tipo', '')"> mdi-close </dx-icon>
                </dx-badge>

                <dx-badge v-if="folio" type="tertiary" label outlined class="mx-0 my-0 mr-3">
                  <div class="darken3--text font-16 line-height-22 weight-400">Folio</div>
                  <dx-icon left class="darken3--text ml-2 mr-0" @click.prevent="updatefield('folio', '')"> mdi-close </dx-icon>
                </dx-badge>

                <dx-badge v-if="picker1 || picker2" type="tertiary" label outlined class="mx-0 my-0 mr-3">
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

                <dx-badge v-if="picker3 || picker4" type="tertiary" label outlined class="mx-0 my-0 mr-3">
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
            <v-col class="col-md-3">
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
            <v-col class="col-md-3">
              <dx-button color="darken3" outlined class="filter" @click="dialog = true">
                <div class="text-underline float-left">Filtrar</div>
                <dx-icon right regular class="text-right float-right"> mdi-filter </dx-icon>
              </dx-button>
            </v-col>
          </v-row>
          <DataTable
            color="primary"
            :headers="computedHeaders"
            :items="documentos"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            :class="['table-check', 'bold', 'actions1', 'table-xl', { 'icon-sort-left': isleft }, { ismobile: ismobil }]"
            :mobile-breakpoint="0"
            hide-default-footer
            item-key="materia"
            show-select
            @page-count="pageCount = $event"
          >
            <template v-slot:[`item.materia`]="{ item: { materia, id } }" class="column">
              <NuxtLink class="breaktext" :to="inboxurl + id">{{ materia }}</NuxtLink>
            </template>

            <template v-slot:[`item.createAt`]="{ item: { createAt } }" class="column">
              {{ formatdate(createAt) }}
            </template>

            <template v-slot:[`item.updateAt`]="{ item: { updateAt } }" class="column">
              {{ formatdate(updateAt) }}
            </template>

            <template v-slot:[`item.access`]="{ item: { access } }">
              <v-chip v-for="v in access" :key="v" class="ml-2" color="primary" small>
                {{ v }}
              </v-chip>
            </template>

            <template v-slot:[`item.actions`]>
              <div class="d-flex">
                <slot name="actions" />
              </div>
            </template>

            <template v-slot:footer>
              <div class="py-7 v-data-footer bg-grey1">
                <dx-pagination v-model="page" :length="pageCount" />
              </div>
            </template>
            <template v-slot:no-data> {{ emptyResults }} </template>
          </DataTable>
        </v-col>
      </perfect-scrollbar>
    </v-row>
    <slot name="filter-dialog">
      <ModalDocumentFilters
        v-model="dialog"
        :tema="tema"
        :folio="folio"
        :tipo="tipo"
        :created-start="picker1"
        :created-end="picker2"
        :updated-start="picker3"
        :updated-end="picker4"
        :document-options="doctype"
        @onCancel="dialogCancel"
        @onFilter="dialogFilter"
        @onClose="dialog = false"
      />
    </slot>
  </div>
</template>

<script>
import moment from 'moment'
import ModalDocumentFilters from '../../modal/DocumentFilters'
export default {
  components: {
    ModalDocumentFilters,
  },
  props: {
    inboxurl: {
      type: String,
      default: '',
    },
    documentos: {
      type: Array,
      default: () => [],
    },
    title: String,
    subtitle: String,
    emptyResults: String,
  },
  data: () => ({
    dialog: false,
    picker1: '',
    picker2: '',
    picker3: '',
    picker4: '',
    tema: '',
    tipo: '',
    folio: '',
    options: [5, 10, 20, 30],
    doctype: ['Oficio', 'otro'],
    tabs: [{ tab: 'Pendientes', number: 5 }],
    items: ['Administrador', 'otro'],
    filtermenu: [...Array(4)].map((_, i) => `Texto de ejemplo  ${i}`),
    selected: [],
    search: '',
    isleft: true,
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    filtered: false,
  }),
  computed: {
    emptyfilter() {
      return this.picker1 || this.picker2 || this.picker3 || this.picker1 || this.tema || this.tipo || this.tema || this.folio
    },
    ismobil() {
      return this.$vuetify.breakpoint.xs
    },
    computedHeaders() {
      return this.headers.filter(h => (this.$vuetify.breakpoint.xs ? h.value == 'materia' || h.value == 'actions' : h.value))
    },
    headers() {
      return [
        {
          text: 'Tema',
          align: 'start',
          value: 'materia',
          sortable: true,
          filter: this.temaFilter,
        },
        { text: 'Tipo', value: 'tipoDocumentoOficial.descripcion', sortable: true, filter: this.tipoFilter },
        { text: 'Folio', value: 'folio', sortable: true, filter: this.folioFilter },
        { text: 'Creación', value: 'createAt', sortable: true, filter: this.creacionFilter },
        { text: 'Actualización', value: 'updateAt', sortable: true, filter: this.actualizacionFilter },
        { text: 'Acciones', align: this.ismobil ? 'center' : 'start', value: 'actions', sortable: false },
      ]
    },
  },
  mounted() {
    console.log(this.documentos)
  },
  methods: {
    formatdate(date) {
      return moment(date).format('DD-MM-YYYY hh:mm')
    },
    updatefield(key, data) {
      this[key] = data
    },
    dialogCancel() {
      this.cancelar()
      this.dialog = false
    },
    dialogFilter(filters) {
      const { tema, tipo, folio, createdStart, createdEnd, updatedStart, updatedEnd } = filters

      this.tema = tema
      this.tipo = tipo
      this.folio = folio
      this.picker1 = createdStart
      this.picker2 = createdEnd
      this.picker3 = updatedStart
      this.picker4 = updatedEnd

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
      const from_ = new Date(from)
      const to_ = new Date(to)
      const current_ = new Date(current)
      return current_ >= from_ && current_ <= to_
    },
    creacionFilter(value) {
      return this.between(this.picker1, this.picker2, value)
    },
    actualizacionFilter(value) {
      return this.between(this.picker3, this.picker4, value)
    },
  },
}
</script>
<style lang="scss" scoped>
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
