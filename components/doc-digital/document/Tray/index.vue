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
            <dx-select
              v-model="itemsPerPage"
              @change="setItemsPerPage"
              :items="options"
              :label="itemsPerPage.toString()"
              class="d-inline-flex min-content mb-md-3"
            />
            <span class="ml-md-3"
              >resultados de un total de <b>{{ countDocumentos }} documentos pendientes</b>.</span
            >
          </div>

          <div v-if="emptyfilter">
            <v-row class="mb-2">
              <v-col cols="12">
                <dx-badge v-if="tema" type="tertiary" label outlined class="mx-0 my-0 mr-3">
                  <div class="darken3--text font-16 line-height-22 weight-400">Tema</div>
                  <dx-icon left class="darken3--text ml-2 mr-0" @click.prevent="cleanitem('tema')"> mdi-close </dx-icon>
                </dx-badge>

                <dx-badge v-if="tipo" type="tertiary" label outlined class="mx-0 my-0 mr-3">
                  <div class="darken3--text font-16 line-height-22 weight-400">Tipo</div>
                  <dx-icon left class="darken3--text ml-2 mr-0" @click.prevent="cleanitem('tipo')"> mdi-close </dx-icon>
                </dx-badge>

                <dx-badge v-if="folio" type="tertiary" label outlined class="mx-0 my-0 mr-3">
                  <div class="darken3--text font-16 line-height-22 weight-400">Folio</div>
                  <dx-icon left class="darken3--text ml-2 mr-0" @click.prevent="cleanitem('folio')"> mdi-close </dx-icon>
                </dx-badge>

                <dx-badge v-if="picker1 || picker2" type="tertiary" label outlined class="mx-0 my-0 mr-3">
                  <div class="darken3--text font-16 line-height-22 weight-400">Creación</div>
                  <dx-icon
                    left
                    class="darken3--text ml-2 mr-0"
                    @click.prevent="
                      cleanitem('picker1')
                      cleanitem('picker2')
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
                      cleanitem('picker3')
                      cleanitem('picker4')
                    "
                  >
                    mdi-close
                  </dx-icon>
                </dx-badge>
              </v-col>
            </v-row>

            <v-row class="mb-5">
              <v-col>
                <dx-button color="primary" outlined class="text-none mr-3" @click="dialogCancel">
                  <span class="text-underline"> Limpiar </span>
                </dx-button>

                <dx-button color="primary" outlined class="text-none" @click="dialog = true">
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
                @input="searchByMateria"
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
            item-key="id"
            :show-select="showselect"
            @page-count="pageCount"
          >
            <template v-slot:[`item.documento.materia`]="{ item: { documento, id } }" class="column">
              <NuxtLink class="breaktext" :to="inboxurl + id">{{ documento.materia }}</NuxtLink>
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

            <template v-slot:[`item.actions`]="{ item: { id } }">
              <div class="d-flex">
                <slot name="actions" :docid="id" />
              </div>
            </template>

            <template v-slot:footer>
              <div class="py-7 v-data-footer bg-grey1">
                <dx-pagination v-model="page" :length="pageCount()" />
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
        @onClose="dialog = false"
        @onCancel="dialogCancel"
        @onFilter="dialogFilter"
        :iscancel="iscancel"
        :ctema="ctema"
        :ctipo="ctipo"
        :cfolio="cfolio"
        :ccreatedStart="cpicker1"
        :ccreatedEnd="cpicker2"
        :cupdatedStart="cpicker3"
        :cupdatedEnd="cpicker4"
      />
    </slot>
  </div>
</template>

<script>
import moment from 'moment'
import ModalDocumentFilters from '../../modal/DocumentFilters'
export default {
  fetch() {
    this._fetch()
  },
  components: {
    ModalDocumentFilters,
  },
  props: {
    inbox: {
      type: String,
      default: '',
    },
    inboxurl: {
      type: String,
      default: '',
    },
    showselect: {
      type: Boolean,
      default: true,
    },
    title: String,
    subtitle: String,
    emptyResults: String,
  },
  data: () => ({
    dialog: false,
    iscancel: false,
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
    itemsPerPage: 5,

    //watch
    _watch: Object,
    ctema: false,
    ctipo: false,
    cfolio: false,
    cpicker1: false,
    cpicker2: false,
    cpicker3: false,
    cpicker4: false,
  }),
  computed: {
    /*documentsDuplicate() {
      var existingIds = {}
      return this.documentos.filter(function (item) {
        if (existingIds[item.id]) return false
        return (existingIds[item.id] = true)
      })
    },*/
    documentos() {
      return this.$store.getters['documents/getDocs']
    },
    countDocumentos() {
      return this.$store.getters['documents/getDocsLenth']
    },
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
          value: 'documento.materia',
          sortable: true,
        },
        { text: 'Tipo', value: 'documento.tipoDocumentoOficial.descripcion', sortable: true },
        { text: 'Folio', value: 'documento.folio', sortable: true },
        { text: 'Creación', value: 'createAt', sortable: true },
        { text: 'Actualización', value: 'updateAt', sortable: true },
        { text: 'Acciones', align: this.ismobil ? 'center' : 'start', value: 'actions', sortable: false },
      ]
    },
  },
  methods: {
    cleanInfo(item) {
      this[item] = true
    },
    reverse(_date) {
      return moment(_date).format('DD-MM-YYYY')
    },
    make(key, value) {
      return key ? value : {}
    },
    pageCount() {
      const pagescount = this.$store.getters['documents/getDocsLenth']
      return parseInt(pagescount / this.itemsPerPage)
    },
    async _fetch(other) {
      const params = {
        ...other,
        usuario: 2, //this.$store.getters['userId'],
        orderBy: this.orderBy,
        orderType: this.orderType,
        pageNumber: this.page - 1,
        pageSize: this.itemsPerPage,
      }
      await this.$store.dispatch('documents/getDocuments', { inbox: this.inbox, params })
    },

    setItemsPerPage(value) {
      this._fetch({ pageSize: value })
    },
    searchByMateria(search) {
      this._fetch({ materia: search })
    },
    formatdate(date) {
      return moment(date).format('DD-MM-YYYY hh:mm')
    },
    cleanitem(key) {
      this[key] = ''
      this['c' + key] = true
      this._fetch({
        materia: this.tema,
        tipoDocumento: this.tipo,
        folio: this.folio,
        ...this.make(this.picker1, { fechaCreacionDesde: this.reverse(this.picker1) }),
        ...this.make(this.picker2, { fechaCreacionHasta: this.reverse(this.picker2) }),
        ...this.make(this.picker3, { fechaActualizacionDesde: this.reverse(this.picker3) }),
        ...this.make(this.picker4, { fechaActualizacionCreacionHasta: this.reverse(this.picker4) }),
      })
    },
    dialogCancel() {
      this.tema = ''
      this.tipo = ''
      this.folio = ''
      this.picker1 = ''
      this.picker2 = ''
      this.picker3 = ''
      this.picker4 = ''
      this.dialog = false
      this.iscancel = true
      this._fetch()
    },
    dialogFilter(filters) {
      const { tema, tipo, folio, createdStart, createdEnd, updatedStart, updatedEnd } = filters

      this._fetch({
        materia: tema,
        tipoDocumento: tipo,
        folio: folio,
        ...this.make(createdStart, { fechaCreacionDesde: this.reverse(createdStart) }),
        ...this.make(createdEnd, { fechaCreacionHasta: this.reverse(createdEnd) }),
        ...this.make(updatedStart, { fechaActualizacionDesde: this.reverse(updatedStart) }),
        ...this.make(updatedEnd, { fechaActualizacionCreacionHasta: this.reverse(updatedEnd) }),
      })
      this.dialog = false
      this.tema = tema
      this.tipo = tipo
      this.folio = folio
      this.picker1 = createdStart
      this.picker2 = createdEnd
      this.picker3 = updatedStart
      this.picker4 = updatedEnd
    },
  },
  watch: {
    page: {
      handler: function (newValue, before) {
        this._fetch()
      },
      deep: true,
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
