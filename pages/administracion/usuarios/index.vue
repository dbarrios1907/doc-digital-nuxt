<template>
<div class="fill-height usuarios" style="min-height: 780px">
    <dx-breadcrumbs v-if="!ismobil" :items="breadcrums" class="mb-10" />
    <dx-bodytitle class="">
        <template v-slot:title>
            <div class="weight-700 line-height-31 font-25">Usuarios</div>
        </template>
    </dx-bodytitle>
    <v-row no-gutters>
        <div class="col-sm-6 col-md-6">
            <div v-if="!isListEmpty" class="mt-10 weight-400">
                <span class="mr-2">Mostrando hasta</span>
                <v-select v-if="activeTab === 'Activos'" v-model="itemsPerPageUA" class="d-inline-flex min-content select" style="width: 104px" :items="options" label="5" value="5" solo flat outlined v-bind="$props" ripple="false" single-line :menu-props="{ bottom: true, offsetY: true, openOnClick: false }" :class="ismobil" />
                <v-select v-else v-model="itemsPerPageUI" class="d-inline-flex min-content select" style="width: 104px" :items="options" label="5" value="5" solo flat outlined v-bind="$props" ripple="false" single-line :menu-props="{ bottom: true, offsetY: true, openOnClick: false }" :class="ismobil" />
                <span :class="{ 'ml-3': !ismobil }">resultados de un total de <b>{{countUsuarios + (countUsuarios > 1 ?  ' usuarios' : ' usuario')}}</b></span>
            </div>
            <dx-alert v-else class="mb-9 mt-10 custom-alert font-14 line-height-18 elevation-0" :class="[{ 'px-4': ismobil }]" absolute bottom right type="error" outlined :show-left-icon="false" :show-right-icon="false">
                No se han encontrado coincidencias.
            </dx-alert>
        </div>
        <div :class="['col-sm-6 col-md-6', ismobil, { 'd-flex justify-end align-center': !ismobil }, { 'mt-7': ismobil }]">
            <NuxtLink to="/administracion/usuarios/insertar" class="text-underline weight-700 font-title"> + Agregar Usuario</NuxtLink>
        </div>
    </v-row>
    <v-row class="mt-4" no-gutters>
        <dx-tabs :items="tabs" tabtype="default" class="users-tab mt-7" @getActiveTab="get_tab">
            <template v-slot:tab-item>
                <v-tab-item>
                    <DataTable :headers="computedHeaders" :items="usuariosActivos" :page.sync="pageUA" :items-per-page="getItemsPerPages(itemsPerPageUA)" :class="['table-check', 'table-sm', ismobil]" :mobile-breakpoint="0" dense :item-key="'nombres' + Math.random().toString()" @page-count="pageCountUA = $event" hide-default-footer calculate-widths>
                        <template v-for="h in computedHeaders" v-slot:[`header.${h.value}`]="{ header }" class="column">
                            {{ h.text }}
                            <v-icon :class="[{ iconsearch: h.search }, { focus: actived === h.value }]" :key="h.value" @click="activeSearch(header, $event)" v-if="h.search">mdi-magnify</v-icon>
                        </template>
                        <template slot="body.prepend" v-if="searchname || searchrut || filtered">
                            <tr class="body-prepend">
                                <td>
                                    <v-text-field type="text" @focus="actived = 'nombres'" hide-details solo flat outlined v-model="filterValue" label="Nombre" v-if="searchname" />
                                </td>
                                <td v-if="!ismobil">
                                    <v-text-field type="text" @focus="actived = 'rut'" hide-details solo flat outlined v-model="filterRut" label="Rut" v-if="searchrut" />
                                </td>
                                <td v-if="!ismobil"></td>
                                <td v-if="!ismobil"></td>
                            </tr>
                        </template>
                        <template v-slot:[`item.nombres`]="{ item: { nombres, apellidos } }">
                            <span class="breaktext">{{ nombres + ' ' + apellidos }}</span>
                        </template>

                        <template v-slot:[`item.rut`]="{ item: { rut } }">
                            <span class="breaktext">{{ rut }}</span>
                        </template>

                        <template v-slot:[`item.access`]="{ item: { roles } }">
                            <v-chip v-for="v in roles" :key="v+Math.random()" class="ml-2 my-1" color="primary" small>
                                {{ getUserRole(v) }}
                            </v-chip>
                        </template>

                        <template v-slot:[`item.actions`]="{ item: { id } }">
                            <v-icon dense @click="get_user_details(id)" :class="[{ 'mr-3': !ismobil }, { 'mx-4': ismobil }]"> mdi-square-edit-outline </v-icon>
                            <v-icon dense class="mr-3" @click="open_user_details(id)"> mdi-eye </v-icon>
                            <v-icon dense @click="userid = id, isBloqueado = false, dialog_confirmacion = true"> mdi-minus-circle-outline </v-icon>
                        </template>

                        <template v-slot:footer>
                            <div :class="['pt-4 v-data-footer', ismobil]">
                                <dx-pagination v-model="pageUA" :length="pageCountUA" />
                            </div>
                        </template>
                    </DataTable>
                </v-tab-item>
                <v-tab-item>
                    <DataTable :headers="computedHeaders" :items="usuariosInactivos" :page.sync="pageUI" :items-per-page="getItemsPerPages(itemsPerPageUI)" :class="['table-check', 'table-sm', ismobil]" :mobile-breakpoint="0" dense :item-key="'nombres' + Math.random().toString()" hide-default-footer calculate-widths @page-count="pageCountUI = $event">
                        <template v-for="h in computedHeaders" v-slot:[`header.${h.value}`]="{ header }" class="column">
                            {{ h.text }}
                            <v-icon v-if="h.search" :key="h.value" :class="[{ iconsearch: h.search }, { focus: actived === h.value }]" @click="activeSearch(header, $event)">
                                mdi-magnify
                            </v-icon>
                        </template>
                        <template v-if="searchname || searchrut || filtered" slot="body.prepend">
                            <tr class="body-prepend">
                                <td>
                                    <v-text-field v-model="filterValue" type="text" hide-details solo v-if="searchname" flat outlined label="Nombre" @focus="actived = 'nombres'" />
                                </td>
                                <td v-if="!ismobil">
                                    <v-text-field v-model="filterRut" type="text" hide-details solo v-if="searchrut" flat outlined label="Rut" @focus="actived = 'rut'" />
                                </td>
                                <td v-if="!ismobil"></td>
                                <td v-if="!ismobil"></td>
                            </tr>
                        </template>

                        <template v-slot:[`item.nombres`]="{ item: { nombres, apellidos } }">
                            <span class="breaktext">{{ nombres + ' ' + apellidos }}</span>
                        </template>

                        <template v-slot:[`item.rut`]="{ item: { rut } }">
                            <span class="breaktext">{{ rut }}</span>
                        </template>

                        <template v-slot:[`item.access`]="{ item: { roles } }">
                            <v-chip v-for="v in roles" :key="v+Math.random()" class="ml-2 my-1" color="primary" small>
                                {{ getUserRole(v) }}
                            </v-chip>
                        </template>

                        <template v-slot:[`item.actions`]="{ item: { id } }">
                            <v-icon dense @click="get_user_details(id)" :class="[{ 'mr-3': !ismobil }, { 'mx-4': ismobil }]"> mdi-square-edit-outline </v-icon>
                            <v-icon dense class="mr-3" @click="open_user_details(id)"> mdi-eye </v-icon>
                            <v-icon dense @click="userid = id, isBloqueado = true, dialog_confirmacion = true"> mdi-minus-circle-outline </v-icon>
                        </template>

                        <template v-slot:footer>
                            <div class="pt-2 v-data-footer">
                                <dx-pagination v-model="pageUI" :length="pageCountUI" />
                            </div>
                        </template>
                    </DataTable>
                </v-tab-item>
            </template>
        </dx-tabs>
    </v-row>
    <DialogDetail :dialog="details_dialog" :items="details" headTitle="Entidad">
        <template v-slot:actions>
            <dx-button color="primary" outlined v-bind="$props" class="text-none" :to="'/administracion/usuarios/editar/' + selected_user">
                <span class="text-underline"> Editar </span>
            </dx-button>
            <dx-button color="white" outlined v-bind="$props" :class="[{ 'ml-4': ismobil }]" class="text-none mr-2 primary" @click="details_dialog = false">
                <span class="text-underline"> Cerrar </span>
            </dx-button>
        </template>
    </DialogDetail>

    <DialogConfirmation :dialog="dialog_confirmacion" :headTitle="isBloqueado ? '¿Realmente desea activar el usuario?' : '¿Realmente desea inactivar el usuario?'">
        <template v-slot:actions>
            <dx-button color="white" outlined v-bind="$props" :class="[{ 'ml-4': ismobil }]" class="text-none mr-2 primary" @click="setUserStatus()">
                <span class="text-underline"> {{isBloqueado ? 'Activar' : 'Inactivar'}} </span>
            </dx-button>
            <dx-button color="primary" outlined v-bind="$props" class="text-none" @click="dialog_confirmacion = false, userid = '', isBloqueado = false">
                <span class="text-underline"> Cancelar </span>
            </dx-button>
        </template>
    </DialogConfirmation>
</div>
</template>

<script>
import {
    isArray
} from '~/shared/utils/array'
import {
    isValidResponse
} from '~/shared/utils/request'
export default {
    name: 'Usuarios',
    fetch() {
        // console.log('FETCH ON USERS')
        this.$store.dispatch('usuarios/getUsers')
        this.$store.dispatch('usuarios/getRoles')
    },
    data() {
        return {
            tabs: [{
                tab: 'Activos'
            }, {
                tab: 'Inactivos'
            }],
            activeTab: 'Activos',
            options: ['5', '10', '20', '30'],
            breadcrums: [{
                    text: 'Administración',
                    disabled: false,
                    href: 'breadcrumbs_dashboard',
                },
                {
                    text: 'Usuarios',
                    disabled: true,
                    href: 'breadcrumbs_link_2',
                },
            ],
            actionitems: ['Visar', 'Firmar', 'Asignar', 'Descartar'],
            drawer: true,
            right: null,
            open: [1, 2],
            tree: null,
            caseSensitive: false,
            actived: null,
            searchname: false,
            searchrut: false,
            filtered: false,
            filterValue: '',
            filterRut: '',
            isleft: true,
            pageUA: 1,
            pageUI: 1,
            pageCountUI: 0,
            pageCountUA: 0,
            itemsPerPageUI: ['5'],
            itemsPerPageUA: ['5'],
            permiso: [],
            details_dialog: false,
            dialog_confirmacion: false,
            selected_user: '',
            permisosValues: ['Administrador', 'Jefe de servicio', 'Operador', 'Oficina de partes'],
            loading: false,
            selectedUser: null,
            userid: '',
            isBloqueado: false,
            details: [],
        }
    },
    computed: {
        ismobil() {
            return this.$vuetify.breakpoint.xs ? 'ismobile' : ''
        },
        computedHeaders() {
            return this.headers.filter(h => (this.$vuetify.breakpoint.xs ? h.value == 'nombres' || h.value == 'actions' : h.value))
        },
        headers() {
            return [{
                    text: 'Nombre',
                    align: 'start',
                    sortable: true,
                    value: 'nombres',
                    filter: this.nameFilter,
                    search: true,
                },
                {
                    text: 'Rut',
                    value: 'rut',
                    sortable: true,
                    filter: this.rutFilter,
                    search: true
                },
                {
                    text: 'Permisos adicionales',
                    value: 'access',
                    filterable: true,
                    sortable: false,
                    filter: this.permisosFilter
                },
                {
                    text: 'Acciones',
                    value: 'actions',
                    sortable: false
                },
            ]
        },
        isListEmpty() {
            const activos = this.$store.getters['usuarios/getActivos']
            const inactivos = this.$store.getters['usuarios/getInctivos']
            if (this.activeTab === 'Activos') return activos.length === 0
            else return inactivos.length === 0
        },
        usuariosActivos() {
            return this.$store.getters['usuarios/getActivos']
        },
        usuariosInactivos() {
            return this.$store.getters['usuarios/getInctivos']
        },
        countUsuarios() {
            const activos = this.$store.getters['usuarios/getActivos']
            const inactivos = this.$store.getters['usuarios/getInctivos']
            if (this.activeTab === 'Activos') return activos.length
            else return inactivos.length
        },     
    },
    methods: {
        getUserRole(role) {
            let userRoles = this.$store.getters['usuarios/getRoles']
            if(userRoles)
              return userRoles.find(r => r.key === role).name;
            else 
              return role
        },
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
            console.log(value)
            return value.toLowerCase().includes(this.filterValue.toLowerCase())
        },
        rutFilter(value) {
            if (!this.filterRut) {
                return true
            }
            return value.includes(this.filterRut)
        },
        activeSearch(header, value) {
            event.stopPropagation()
            if (header.value == 'nombres') this.searchname = !this.searchname
            if (header.value == 'rut') this.searchrut = !this.searchrut
        },
        removeItem(item) {
            this.permiso = this.permiso.filter(function (val) {
                return item !== val
            })
        },
        permisosFilter(value) {
            let flag = false
            if (this.permiso.length == 0) return true

            value.filter(function (e) {
                flag = this.indexOf(e) > -1
            }, this.permiso)

            return flag
        },
        async getUser(id) {
            let resp = null
            this.selectedUser = null
            try {
                resp = await this.$store.dispatch('usuarios/getUser', id)
            } catch (error) {}

            const [valid, Toast] = isValidResponse(resp)

            if (!valid) {
                Toast.error({
                    message: 'Usuario no encontrado',
                })
                this.loading = false
            } else {
                this.loading = false
                return resp
            }

            return null
        },
        async get_user_details(id) {
            let userid = id.toString()
            const resp = await this.getUser(id)
            if (resp) {
                this.$router.replace('/administracion/usuarios/editar/' + userid)
            }
        },
        async open_user_details(id) {
            this.selected_user = id.toString()
            this.selectedUser = null
            this.loading = true
            let resp = await this.getUser(this.selected_user)
            if (resp) {
                const u = resp.result
                this.details = [{
                        label: 'Estado:',
                        value: !u.isBloqueado ? 'Activo' : 'Inactivo'
                    },
                    {
                        label: 'RUT:',
                        value: u.run + '-' + u.dv
                    },
                    {
                        label: 'Nombre(s):',
                        value: u.nombres ? u.nombres : '-'
                    },
                    {
                        label: 'Apellidos:',
                        value: u.apellidos ? u.apellidos : '-'
                    },
                    {
                        label: 'Correo:',
                        value: u.correoInstitucional ? u.correoInstitucional : '-'
                    },
                    {
                        label: 'Cargo:',
                        value: u.cargo ? u.cargo : '-'
                    },
                    {
                        label: 'Permisos adicionales:',
                        value: u.cargo ? u.cargo : '-'
                    },
                    {
                        label: 'Cargo:',
                        value: u.cargo ? u.cargo : '-'
                    },
                ]
                this.selectedUser = resp.result
                this.details_dialog = true
                this.loading = false
            }
        },
        get_tab(activetab) {
            this.activeTab = activetab
        },
        async setUserStatus() {
            let resp = null
            try {
                resp = await this.$store.dispatch('usuarios/setUserStatus', {
                    id: this.userid,
                    status: !this.isBloqueado
                })
            } catch (err) {
                Toast.error({
                    message: 'Ha ocurrido un error',
                })
            }

            const [valid, Toast] = isValidResponse(resp)

            if (!valid) {
                Toast.error({
                    message: 'No se pudo eliminar el usuario',
                })
            } else {
                Toast.success({
                    message: this.isBloqueado ? 'Usuario activado' : 'Usuario inactivado',
                })
                this.userid = ''
                this.isBloqueado = false
                this.dialog_confirmacion = false
            }
        },
        getItemsPerPages(itemsperpage) {
            let items = isArray(itemsperpage) ? itemsperpage[0] : itemsperpage
            return parseInt(items)
        },
    },
}
</script>

<style lang="scss">
.v-select .v-input__slot {
    min-height: 48px !important;
}

table a {
    text-decoration: none;
}

.v-application .usuarios .tab-default .v-tab--active,
.v-application .usuarios .tab-default .v-tab:not(.v-tab--active) {
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

/*
.v-application .v-menu__content.theme--light.menuable__content__active,
.v-application .v-menu__content.theme--dark.menuable__content__active {
  margin-top: 0px !important;
  border: 0px !important;
  box-shadow: none !important;
} */

.col-sm-6.ismobile {
    min-width: 202px;
    text-align: center;
}

.dx-filtermenu {
    max-width: 202px;
}

.dx-filtermenu.ismobile {
    max-width: 100% !important;
}

.v-select.ismobile {
    margin: 0 10px;
}

.custom-alert {
    height: 48px !important;
    max-width: 334px;
    border: 1px solid !important;
    box-shadow: none !important;
}

.custom-alert>div {
    margin: 0px auto;
    text-align: center;
}

.custom-alert>div .dx-alert__content {
    padding-right: 0px !important;
}

.custom-alert .vn-message {
    font-size: 14px !important;
    line-height: 18px !important;
    text-align: center !important;
}

// .v-application .usuarios table > thead > tr > th:nth-child(3){
//   max-width: 250px !important;
// }
// table > tbody > tr > td:nth-child(3) {
//   max-width: 250px !important;
// }

.v-application .usuarios .theme--light.v-data-table.table-check thead>tr>th:first-child,
.v-application .usuarios .theme--dark.v-data-table.table-check thead>tr>th:first-child,
.usuarios .theme--dark.v-data-table.table-check thead>tr>th:first-child,
.usuarios .theme--light.v-data-table.table-check thead>tr>th:first-child {
    width: 30% !important;
}

.usuarios {
    table>tbody>tr>td {
        padding: 6px 10px !important;
    }

    :not(.ismobile) {
        table>thead>tr>th:nth-child(2) {
            max-width: 250px !important;
            width: 17% !important;
        }

        table>thead>tr>th:nth-child(3) {
            width: 42% !important;
        }

    }

    .ismobile {
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
}
</style>
