<template>
<div dx-admindocuments :class="['dx-admindocuments', {'mobile-container': ismobil}]">
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
                <div class="my-9 weight-400" v-if="countDocuments > 0">
                    <span class="mr-2">Mostrando hasta</span>
                    <dx-select v-model="itemsPerPage" @change="setItemsPerPage" class="d-inline-flex min-content mb-md-3" :items="options" :label="itemsPerPage.toString()" />
                    <span class="ml-md-3">resultados de un total de <b>{{ countDocuments }} documentos {{documentType}}</b>.</span>
                </div>
                <dx-alert v-else class="mb-9 mt-10 custom-alert font-14 line-height-18 elevation-0 px-4 py-2 text-center" absolute bottom right type="error" outlined :show-left-icon="false" :show-right-icon="false">
                    No se han encontrado coincidencias.
                </dx-alert>

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
                                <dx-icon left class="darken3--text ml-2 mr-0" @click.prevent="
                      updatefield('picker1', '')
                      updatefield('picker2', '')
                    ">
                                    mdi-close
                                </dx-icon>
                            </dx-badge>

                            <dx-badge v-if="picker3 || picker4" type="tertiary" label outlined class="mx-0 my-0 mr-3">
                                <div class="darken3--text font-16 line-height-22 weight-400">Actualización</div>
                                <dx-icon left class="darken3--text ml-2 mr-0" @click.prevent="
                      updatefield('picker3', '')
                      updatefield('picker4', '')
                    ">
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
                    <div class="col-md-3">
                        <dx-button color="darken3" outlined class="filter" @click="dialog = true">
                            <div class="text-underline float-left">Filtra tu Búsqueda</div>
                            <dx-icon right regular class="text-right float-right"> mdi-filter </dx-icon>
                        </dx-button>
                    </div>
                    <div class="col-md-9 text-underline float-right">
                        <div :class="['download-excel', {'movil-container': ismobil}]">
                            <download-excel :class="[{'text-center': ismobil}, {'text-right': !ismobil}]" :data="computedDocuments" type="csv" name="Listado de documentos.csv" :fields="fields">
                                <CsvExport class="text-left float-left" />
                                <div class="text-underline float-right">Descargar listado</div>
                            </download-excel>
                        </div>
                    </div>
                </v-row>
                <dx-tabs v-if="documentType==='recibidos'" :items="computedTabs" tabtype="primary" class="users-tab mt-7" @getActiveTab="get_tab" />
                <DataTable color="primary" :headers="computedHeaders" :items="computedDocuments" @update:options="sortEvent" :page.sync="page" :items-per-page="itemsPerPage" :class="['bold', 'actions1', 'table-xl', { 'icon-sort-left': isleft }, { ismobile: ismobil }]" :mobile-breakpoint="0" hide-default-footer item-key="materia" :show-select="showselect">
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

                    <template v-slot:[`item.actions`]="{ item: { id } }">
                        <div :class="[{'text-center': ismobil}]">
                            <v-icon dense @click="openDetails(id)"> mdi-eye </v-icon>
                            <v-icon dense class="ml-4" @click="deleteDocument(id)">mdi-delete-outline </v-icon>
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
        <ModalDocumentFilters v-model="dialog" :tema="tema" :folio="folio" :tipo="tipo" :created-start="picker1" :created-end="picker2" :updated-start="picker3" :updated-end="picker4" :document-options="doctype" @onCancel="dialogCancel" @onFilter="dialogFilter" @onClose="dialog = false" :iscancel="iscancel" />
    </slot>
</div>
</template>

<script>
import moment from 'moment'
import ModalDocumentFilters from '../../modal/DocumentFilters'
import downloadExcel from "vue-json-excel"
export default {
    components: {
        ModalDocumentFilters,
        downloadExcel,
    },
    props: {
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
        documentType: String,
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
        options: [10, 50, 100, 1000],
        doctype: ['Oficio', 'otro'],
        items: ['Administrador', 'otro'],
        filtermenu: [...Array(4)].map((_, i) => `Texto de ejemplo  ${i}`),
        selected: [],
        search: '',
        isleft: true,
        page: 1,
        itemsPerPage: 10,
        filtered: false,
        fields: {
            "Tema": "materia",
            "Tipo": "tipoDocumentoOficial.descripcion",
            "Folio": "folio",
            "Creación": "createAt",
            "Actualización": "updateAt"
        },
        activeTab: 'Recibidos',
        orderBy: 'materia',
        orderType: 'DESC'
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
            return [{
                    text: 'Tema',
                    align: 'start',
                    value: 'materia',
                    sortable: true,
                    filter: this.temaFilter,
                },
                {
                    text: 'Tipo',
                    value: 'tipoDocumentoOficial.descripcion',
                    sortable: true,
                    filter: this.tipoFilter
                },
                {
                    text: 'Folio',
                    value: 'folio',
                    sortable: true,
                    filter: this.folioFilter
                },
                {
                    text: 'Creación',
                    value: 'createAt',
                    sortable: true,
                    filter: this.creacionFilter
                },
                {
                    text: 'Actualización',
                    value: 'updateAt',
                    sortable: true,
                    filter: this.actualizacionFilter
                },
                {
                    text: 'Acciones',
                    align: this.ismobil ? 'center' : 'start',
                    value: 'actions',
                    sortable: false
                },
            ]
        },
        computedTabs() {
            return [{
                    tab: 'Recibidos',
                    number: 0
                },
                {
                    tab: 'Pendientes',
                    number: 0
                },
            ]
        },
        countDocuments() {
            const docCounts = this.$store.getters['documents/getDocumentsCount']
            const inbox = this.documentType == 'enviados' ? 'enviar' : 'recibir'
            return docCounts(inbox)
        },
        pageCount() {
            return this.countDocuments ? Math.ceil(this.countDocuments / this.itemsPerPage) : 0
        },
        computedDocuments() {
            return this.$store.getters['documents/getDocs']
        },
    },
    methods: {
        get_tab(tab) {
            this.page = 1
            this.itemsPerPage = 10
            this.activeTab = tab
            this.orderBy_= "materia"
            this.orderType = "DESC"
            this.fetchDocuments()
        },
        setItemsPerPage(value) {
            this.fetchDocuments()
        },
        sortEvent(value) {
            const [field, obj] = value.sortBy
            const [order, obj_] = value.sortDesc
            this.orderBy = field
            this.orderType = order ? 'DESC' : 'ASC'
            this.fetchDocuments()
        },
        async fetchDocuments() {
            const params = {
                orderBy: this.orderBy_ ? this.orderBy_ : "materia",
                orderType: this.orderType,
                pageNumber: this.page - 1,
                pageSize: this.itemsPerPage, 
            }
            if (this.documentType == 'recibidos') {
                params['isCompletada'] = this.activeTab == "Recibidos"
            }
            const inbox = this.documentType == 'enviados' ? 'enviar' : 'recibir'
            await this.$store.dispatch('documents/getDocumentsByInbox', [inbox, params])
        },
        formatdate(date) {
            return moment(date).format('DD-MM-YYYY hh:mm')
        },
        updatefield(key, data) {
            this[key] = data
        },
        dialogCancel() {
            this.iscancel = true
            this.filtered = false
            this.dialog = false
        },
        dialogFilter(filters) {
            const {
                tema,
                tipo,
                folio,
                createdStart,
                createdEnd,
                updatedStart,
                updatedEnd
            } = filters

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
        async deleteDocument(id) {
            const resp = await this.$confirmInstance().open('Confirmación', '¿Realmente desea eliminar este documento?')
            if (resp) {
                this.$store.dispatch('documents/deleteDocument', id)
            }
        },
        openDetails(id) {
            this.$router.replace('/administracion/documentos/details/' + id)
        },
    },
    watch: {
        page: {
            handler: function (newValue, before) {
                this.fetchDocuments()
            },
            deep: true,
        },
    },
}
</script>

<style lang="scss" scoped>
.v-data-table.ismobile table>tbody>tr {
    height: 37px !important;
}

.mobile-container .dx-pagination {
    margin: 0px auto !important;
}

.mobile-container {
    table>tbody>tr>td {
        padding: 6px 10px !important;
    }

    table>tbody>tr {
        height: 37px !important;
    }

    table>tbody>tr>td:nth-child(1),
    table>thead>tr>th:nth-child(1) {
        text-align: left;
    }

    .dx-pagination {
        margin: 0px auto !important;
    }
}

@include theme(v-application) using ($material) {
    .download-excel {
        width: 158px;
        height: 48px;
        padding: 9px 0px;
        color: #0F69C4;
        cursor: pointer;
    }

    .download-excel:not(.movil-container) {
        float: right;
    }

    .download-excel.movil-container {
        margin: 0px auto
    }
}

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

.dx-admindocuments a {
    text-decoration: none !important;
}
</style>
