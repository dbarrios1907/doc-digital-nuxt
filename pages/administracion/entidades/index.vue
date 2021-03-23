<template>
<div class="fill-height entidades" style="min-height: 780px">
    <dx-breadcrumbs v-if="!ismobil" :items="breadcrums" class="mb-10" />
    <dx-bodytitle class="">
        <template v-slot:title>
            <div class="weight-700 line-height-31 font-25">Entidades</div>
        </template>
    </dx-bodytitle>
    <div v-if="!isListEmpty" class="mt-10 weight-400">
        <span class="mr-2">Mostrando hasta</span>
        <v-select v-model="itemsPerPage" class="d-inline-flex min-content select" style="width: 104px" :items="options" label="5" value="5" solo flat outlined v-bind="$props" ripple="false" single-line :menu-props="{ bottom: true, offsetY: true, openOnClick: false }" :class="ismobil" />
        <span :class="{ 'ml-3': !ismobil }">resultados de un total de <b>{{countEntities + (countEntities > 1 ?  ' entidades' : ' entidad')}}</b></span>
    </div>
    <dx-alert v-else class="mb-9 mt-10 custom-alert font-14 line-height-18 elevation-0" :class="[{ 'px-4': ismobil }]" absolute bottom right type="error" outlined :show-left-icon="false" :show-right-icon="false">
        No se han encontrado coincidencias.
    </dx-alert>
    <v-row no-gutters>
        <!-- <div :class="['col-md-12 col-sm-12', ismobil, { 'mt-8': ismobil }]">
            <dx-filtermenu label="Filtra tu búsqueda" :items="['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4']" :class="ismobil" />
        </div> -->
        <div :class="['col-md-12 col-sm-12', ismobil, { 'd-flex justify-end align-center': !ismobil }, { 'mt-5  text-center': ismobil }]">
            <a @click.prevent="openEntityForm" class="text-underline weight-700 font-title"> + Agregar Entidad</a>
        </div>
    </v-row>
    <v-row class="mt-6" no-gutters>
        <DataTable :headers="computedHeaders" :items="getEntities" :page.sync="page" :items-per-page="itemsPerPage" :class="['table-check', 'table-sm', ismobil]" :mobile-breakpoint="0" dense item-key="name" hide-default-footer calculate-widths @page-count="pageCount = $event">
            <template v-for="h in computedHeaders" v-slot:[`header.${h.value}`]="{ header }" class="column">
                {{ h.text }}
                <v-icon v-if="h.search" :key="h.value" :class="[{ iconsearch: h.search }, { focus: actived === h.value }]" @click="activeSearch(header, $event)">
                    mdi-magnify
                </v-icon>
                <!-- <v-icon v-if="h.filterable" :key="h.value" :class="['float-right', { focus: actived === h.value }]" @click="openFilter(header, $event)">
                    mdi-filter
                </v-icon> -->
            </template>
            <template v-if="searchname || searchid || filtered" slot="body.prepend">
                <tr class="body-prepend">
                    <td v-if="!ismobil" />
                    <td>
                        <v-text-field v-model="filterValue" type="text" hide-details solo v-if="searchname" flat outlined label="Nombre" @focus="actived = 'nombre'" />
                    </td>
                    <td v-if="!ismobil" />
                    <td />
                </tr>
            </template>

            <template v-slot:[`item.name`]="{ item: { nombre } }">
                <span class="breaktext">{{ nombre }}</span>
            </template>

            <template v-slot:[`item.access`]="{ item: { entidadDependencia } }">
                <span class="breaktext">{{ entidadDependencia ? entidadDependencia.nombre : '' }}</span>
            </template>

            <template v-slot:[`item.entidadid`]="{ item: { id } }">
                <v-icon dense :class="[{ 'mr-4': !ismobil }]" @click="editEntity(id)"> mdi-square-edit-outline </v-icon>
                <v-icon dense :class="[{ 'mr-4': !ismobil }]" @click="gotDetail(id)"> mdi-eye </v-icon>
                <v-icon dense @click="onDeleteEntity(id)"> mdi-delete-outline </v-icon>
            </template>

            <template v-slot:footer>
                <div class="pt-2 v-data-footer">
                    <dx-pagination v-model="page" :length="pageCount" />
                </div>
            </template>
        </DataTable>
    </v-row>
    <EntityDialog :dialog="entity_dialog" :data="selected_entidad" @close="entity_dialog = false" @sumbit="onSumbitEntity">
        <template v-slot:actionclose>
            <v-btn icon color="darken3" @click="entity_dialog = false, selected_entidad = null ">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </template>
        <template v-slot:actions>

        </template>
    </EntityDialog>
    <AdminDetail :dialog="entity_detail_dialog" :items="details" headTitle="Entidad">
        <template v-slot:actions>
            <dx-button color="primary" outlined v-bind="$props" class="text-none" @click="editEntity(selected_entidad.id)">
                <span class="text-underline"> Editar </span>
            </dx-button>
            <dx-button color="white" outlined v-bind="$props" :class="[{ 'ml-4': ismobil }]" class="text-none mr-2 primary" @click="entity_detail_dialog = false">
                <span class="text-underline"> Cerrar </span>
            </dx-button>
        </template>
    </AdminDetail>
    <AdminConfirmation :dialog="dialog_confirmacion" headTitle="¿Realmente desea eliminar esta entidad?">
        <template v-slot:actions>
            <dx-button color="white" outlined v-bind="$props" :class="[{ 'ml-4': ismobil }]" class="text-none mr-2 primary" @click="deleteEntity">
                <span class="text-underline"> Aceptar </span>
            </dx-button>
            <dx-button color="primary" outlined v-bind="$props" class="text-none" @click="dialog_confirmacion = false">
                <span class="text-underline"> Cancelar </span>
            </dx-button>
        </template>
    </AdminConfirmation>
</div>
</template>

<script>
import {
    isValidResponse
} from '~/shared/utils/request'
export default {
    name: 'Entidades',
    fetch() {
        this.$store.dispatch('entidades/getEntities')
    },
    data() {
        return {
            tabs: [{
                tab: 'Activos'
            }, {
                tab: 'Inactivos'
            }],
            options: ['5', '10', '20', '30'],
            breadcrums: [{
                    text: 'Administración',
                    disabled: false,
                    href: '#',
                },
                {
                    text: 'Entidades',
                    disabled: true,
                    href: 'breadcrumbs_link_2',
                },
            ],
            drawer: true,
            right: null,
            open: [1, 2],
            tree: null,
            caseSensitive: false,
            actived: null,
            searchname: false,
            searchid: false,
            filtered: false,
            filterValue: '',
            filterid: '',
            page: 1,
            pageCount: 3,
            itemsPerPage: 5,
            entity_dialog: false,
            entity_detail_dialog: false,
            dialog_confirmacion: false,
            entity_id: '',
            details: [],
            selected_entidad: null,
            valuess: [],
        }
    },
    computed: {
        ismobil() {
            return this.$vuetify.breakpoint.xs ? 'movil-container' : ''
        },
        computedHeaders() {
            return this.headers.filter(h => (this.$vuetify.breakpoint.xs ? h.value == 'nombre' || h.value == 'entidadid' : h.value))
        },
        headers() {
            return [{
                    text: 'Id',
                    value: 'id',
                    sortable: true,
                    search: false,
                    width: 70
                },
                {
                    text: 'Nombre',
                    align: 'start',
                    sortable: true,
                    value: 'nombre',
                    filter: this.nameFilter,
                    search: true,
                },
                {
                    text: 'Entidad dependiente',
                    value: 'entidaddep',
                    filterable: true,
                    sortable: false,
                    filter: this.entdepFilter
                },
                {
                    text: 'Acciones',
                    value: 'entidadid',
                    sortable: false
                },
            ]
        },
        getEntities() {
            return this.$store.getters['entidades/getEntities']
        },
        countEntities() {
            const entities = this.$store.getters['entidades/getEntities']
            return entities.length
        },
        isListEmpty() {
            const entities = this.$store.getters['entidades/getEntities']
            return entities.length === 0
        },
    },
    methods: {
        actionColor() {
            const isDark = this.$vuetify.theme.dark
            return isDark ? '' : 'deepblue'
        },
        openFilter(header, event) {
            event.stopPropagation()
            this.filtered = !this.filtered
        },
        nameFilter(value) {
            if (!this.filterValue) {
                return true
            }
            return value.toLowerCase().includes(this.filterValue.toLowerCase())
        },
        idFilter(value) {
            if (!this.filterid) {
                return true
            }
            return value.includes(this.filterid)
        },
        activeSearch(header, value) {
            event.stopPropagation()
            if (header.value == 'nombre') this.searchname = !this.searchname
            if (header.value == 'id') this.searchid = !this.searchid
        },
        onSumbitEntity(failed) {
            this.entity_dialog = false
            this.selected_entidad = null
        },
        async openEntityForm() {
            await this.$store.dispatch('entidades/getRegions')
            this.entity_dialog = true
        },
        async editEntity(id) {
            let resp = await this.$store.dispatch('entidades/getEntity', id)
            const [valid, Toast] = isValidResponse(resp)

            if (!valid) {
                Toast.error({
                    message: 'Ha ocurrido un error',
                })
            } else {
                await this.$store.dispatch('entidades/getRegions')
                this.selected_entidad = resp.result
                this.entity_detail_dialog = false
                this.entity_dialog = true
            }
        },
        async gotDetail(id) {
            let resp = await this.$store.dispatch('entidades/getEntity', id)
            const [valid, Toast] = isValidResponse(resp)

            if (!valid) {
                Toast.error({
                    message: 'Ha ocurrido un error',
                })
            } else {
                const e = resp.result
                this.details = [{
                        label: 'Nombre:',
                        value: e.nombre
                    },
                    {
                        label: 'Entidad dependiente:',
                        value: e.entDep ? e.entDep.nombre : ''
                    },
                    {
                        label: 'Correo Oficina de Partes:',
                        value: e.correoOficinaPartes
                    },
                    {
                        label: 'Región:',
                        value: e.region ? e.region.nombre : ''
                    },
                    {
                        label: 'Provincia:',
                        value: e.provincia ? e.provincia.nombre : ''
                    },
                    {
                        label: 'Comuna:',
                        value: e.comuna ? e.comuna.nombre : ''
                    },
                ]
                this.entity_detail_dialog = true
                this.selected_entidad = e
            }
        },
        onDeleteEntity(id) {
            this.entity_id = id
            this.dialog_confirmacion = true
        },
        deleteEntity() {
            const id = this.entity_id
        },
    },

}
</script>

<style lang="scss" scoped>
.entidades {
    .v-select .v-input__slot {
        min-height: 48px !important;
    }

    table a {
        text-decoration: none;
    }

    .v-application .entidades .tab-default .v-tab--active {
        height: 46px !important;
        min-width: 155px !important;
    }

    .v-text-field--outlined>.v-input__control>.v-input__slot {
        min-height: 48px;
        border-radius: 0px;
    }

    .actions-menu {
        width: auto;
        float: right;
        position: absolute;
        right: 28px;
        z-index: 1;
    }

    .v-application .v-menu__content.theme--light.menuable__content__active,
    .v-application .v-menu__content.theme--dark.menuable__content__active {
        margin-top: 0px !important;
        border: 0px !important;
        box-shadow: none !important;
    }

    .col-sm-6.movil-container {
        min-width: 202px;
        text-align: center;
    }

    .dx-filtermenu {
        max-width: 202px;
    }

    .dx-filtermenu.movil-container {
        max-width: 100% !important;
    }

    .v-select.movil-container {
        margin: 0 10px;
    }

    &.table-check.movil-container thead>tr {
        &>th:first-child {
            width: 70% !important;
        }
    }

    &.table-check:not(.movil-container) thead>tr {
        &>th:first-child {
            width: 70px !important;
        }
    }
}
</style>
