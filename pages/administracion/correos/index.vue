<template>
<div class="fill-height correos" style="min-height: 780px">
    <dx-breadcrumbs v-if="!ismobil" :items="breadcrums" class="mb-10" />
    <dx-bodytitle class="">
        <template v-slot:title>
            <div class="weight-700 line-height-31 font-25">Correos de notificación</div>
        </template>
    </dx-bodytitle>
    <div v-if="countNotificacion > 0" class="mt-10 weight-400">
        <span class="mr-2">Mostrando hasta</span>
        <v-select v-model="itemsPerPage" class="d-inline-flex min-content select" style="width: 104px" :items="options" label="10" value="10" solo flat outlined v-bind="$props" ripple="false" single-line :menu-props="{ bottom: true, offsetY: true, openOnClick: false }" :class="ismobil" />
        <span :class="{ 'ml-3': !ismobil }">resultados de un total de <b>{{ countNotificacion + (countNotificacion > 1 ? ' correos' : ' correo') }}</b></span>
    </div>
    <dx-alert v-else class="mb-9 mt-10 custom-alert font-14 line-height-18 elevation-0 px-md-0 px-4" absolute bottom right type="error" outlined :show-left-icon="false" :show-right-icon="false">
        No se han encontrado coincidencias.
    </dx-alert>
    <v-row class="mt-6" no-gutters>
        <DataTable :headers="computedHeaders" :items="getNotificacions" :page.sync="page" :items-per-page="itemsPerPage" :class="['table-check', 'table-sm', ismobil]" :mobile-breakpoint="0" dense item-key="name" hide-default-footer calculate-widths @page-count="pageCount = $event">
            <template v-for="h in computedHeaders" v-slot:[`header.${h.value}`]="{ header }" class="column">
                {{ h.text }}
                <v-icon v-if="h.search" :key="h.value" :class="[{ iconsearch: h.search }, { focus: actived === h.value }]" @click="activeSearch(header, $event)">
                    mdi-magnify
                </v-icon>
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

            <template v-slot:[`item.notifid`]="{ item: { id } }">
                <v-icon dense class="mr-4" @click="notif_dialog = true"> mdi-square-edit-outline </v-icon>
                <v-icon dense class="mr-4" > mdi-eye </v-icon>
            </template>

            <template v-slot:footer>
                <div class="pt-2 v-data-footer">
                    <dx-pagination v-model="page" :length="pageCount" />
                </div>
            </template>
        </DataTable>
    </v-row>
    <admin-notification-dialog :dialog="notif_dialog" :data="correo" @close="notif_dialog = false">
        <template v-slot:actionclose>
            <v-btn icon color="darken3" @click=";(notif_dialog = false), (correo = null)">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </template>
        <template v-slot:actions> </template>
    </admin-notification-dialog>
</div>
</template>

<script>
import {
    isValidResponse
} from '~/shared/utils/request'
export default {
    name: 'Entidades',
    fetch() {
    },
    data() {
        return {
            options: ['5', '10', '20', '30'],
            breadcrums: [{
                    text: 'Administración',
                    disabled: false,
                    href: '/',
                },
                {
                    text: 'Correos de notificación',
                    disabled: true,
                    href: '#',
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
            itemsPerPage: 10,
            notif_dialog: false,
            notif_detail_dialog: false,
            dialog_confirmacion: false,
            notif_id: '',
            details: [],
            correo: null,
            valuess: [],
        }
    },
    computed: {
        ismobil() {
            return this.$vuetify.breakpoint.xs ? 'movil-container' : ''
        },
        computedHeaders() {
            return this.headers.filter(h => (this.$vuetify.breakpoint.xs ? h.value == 'nombre' || h.value == 'notifid' : h.value))
        },
        headers() {
            return [{
                    text: 'Id',
                    value: 'id',
                    sortable: true,
                    search: false,
                    width: 75
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
                    text: 'Asunto',
                    value: 'asunto',
                    filterable: true,
                    sortable: false,
                    filter: this.entdepFilter,
                },
                {
                    text: 'Acciones',
                    value: 'notifid',
                    sortable: false,
                },
            ]
        },
        getNotificacions() {
            return this.$store.getters['notificaciones/getNotificaciones']
        },
        countNotificacion() {
            const entities = this.$store.getters['notificaciones/getNotificaciones']
            return entities.length
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
    },
}
</script>

<style lang="scss" scoped>
.correos {
    .v-select .v-input__slot {
        min-height: 48px !important;
    }
    .movil-container {
        table>tbody>tr {
            height: 37px !important;
        }        

        .dx-pagination {
            margin: 0px auto !important;
        }
    }    
}
@include theme(v-data-table) using ($material) {
        &.table-check thead > tr {
            & > th:first-child {
                min-width: 5rem !important;
                width: 10.6875rem !important;
            }
        }
    }
</style>
