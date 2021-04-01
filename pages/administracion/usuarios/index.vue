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
            <div v-if="countUsuarios > 0" class="mt-10 weight-400">
                <span class="mr-2">Mostrando hasta</span>
                <v-select v-model="itemsPerPage"  @change="setItemsPerPage" class="d-inline-flex min-content select" style="width: 104px" :items="options" label="10" value="10" solo flat outlined v-bind="$props" ripple="false" single-line :menu-props="{ bottom: true, offsetY: true, openOnClick: false }" :class="ismobil" />
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
        <dx-tabs :items="tabs" tabtype="default" class="users-tab mt-7" @getActiveTab="get_tab" />
            <DataTable :headers="computedHeaders" :items="users" @update:options="sortEvent" :page.sync="page" :items-per-page="itemsPerPage" :class="['table-check', 'table-sm', ismobil]" :mobile-breakpoint="0" dense :item-key="'nombres' + Math.random().toString()" hide-default-footer calculate-widths>
                <template v-for="h in computedHeaders" v-slot:[`header.${h.value}`]="{ header }" class="column">
                    {{ h.text }}
                    <v-icon :class="[{ iconsearch: h.search }, { focus: actived === h.value }]" :key="h.value" @click="activeSearch(header, $event)" v-if="h.search">mdi-magnify</v-icon>
                </template>
                <template slot="body.prepend" v-if="searchname || searchrut || searchpermisos || filtered">
                    <tr class="body-prepend">
                        <td>
                            <v-text-field type="text" @input="nameFilter" @focus="actived = 'nombres'" hide-details solo flat outlined v-model="filterName" label="Nombre" v-if="searchname" />
                        </td>
                        <td v-if="!ismobil">
                            <v-text-field type="text" @input="rutFilter"  @focus="actived = 'rut'" hide-details solo flat outlined v-model="filterRut" label="Rut" v-if="searchrut" />
                        </td>
                        <td v-if="!ismobil">
                            <dx-select v-model="filterPermisos" @change="permisosFilter" :items="rolesUser" @on-delete-item="removeItem" label="Permisos" item-text="name" v-if="searchpermisos" item-value="id" multiple v-bind="$props" closableItems :ripple="false">
                            </dx-select>
                        </td>
                        <td v-if="!ismobil"></td>
                    </tr>
                </template>
                <template v-slot:[`item.nombres`]="{ item: { nombres } }">
                    <span class="breaktext">{{ nombres }}</span>
                </template>

                <template v-slot:[`item.rut`]="{ item: { rut } }">
                    <span class="breaktext">{{ rut }}</span>
                </template>

                <template v-slot:[`item.roles`]="{ item: { roles } }">
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
                        <dx-pagination v-model="page" :length="pageCount" />
                    </div>
                </template>
            </DataTable>
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
        const params = {            
            orderBy: 'nombre',
            orderType: 'ASC',
            pageNumber: 0,
            pageSize: 10, 
            isBloqueado: false
        }
        this.$store.dispatch('usuarios/getUsers', params)
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
            options: [10, 50, 100, 1000],
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
            drawer: true,
            right: null,
            open: [1, 2],
            tree: null,
            caseSensitive: false,
            actived: null,
            searchname: false,
            searchrut: false,
            searchpermisos: false,
            filtered: false,
            filterName: '',
            filterRut: '',
            filterPermisos: [],
            isleft: true,
            page: 1,
            itemsPerPage: 10,
            details_dialog: false,
            dialog_confirmacion: false,
            selected_user: '',
            loading: false,
            selectedUser: null,
            userid: '',
            isBloqueado: false,
            details: [],            
            orderBy_: "nombre",
            orderType: 'DESC'
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
                    search: true,
                },
                {
                    text: 'Rut',
                    value: 'rut',
                    sortable: true,
                    search: true
                },
                {
                    text: 'Permisos adicionales',
                    value: 'roles',
                    sortable: false,
                    search: true
                },
                {
                    text: 'Acciones',
                    value: 'actions',
                    sortable: false
                },
            ]
        },
        users(){
            return this.$store.getters['usuarios/getUsers']        
        },
        countUsuarios() {
            return this.$store.getters['usuarios/getUsersCount']            
        },        
        pageCount() {
            return this.countUsuarios ? Math.ceil(this.countUsuarios / this.itemsPerPage) : 0
        },
        rolesUser() {
            return this.$store.getters['usuarios/getRoles']
        },
    },
    methods: {
        getUserRole(role) {
            let userRoles = this.$store.getters['usuarios/getRoles']
            if (userRoles.length > 0) {
                const role_ = userRoles.find(r => r.id === role);
                return role_ ? role_.name : role
            } else
                return role
        },
        userRoles(roles) {
            if (roles.length > 0)
                return roles.filter(rol => rol != "ROLE_USUARIO").map((rol) => {
                    return this.getUserRole(rol)
                }).join(', ')
            else
                ""
        },
        nameFilter(value) {
            this.page = 1
            this.fetchtUsers()
        },
        rutFilter(value) {
           this.page = 1
           this.fetchtUsers()
        },        
        permisosFilter(value) {
            this.page = 1
            this.fetchtUsers()
        },        
        setItemsPerPage(value) {
            this.page = 1
            this.fetchtUsers()
        },
        activeSearch(header, value) {
            event.stopPropagation()
            if (header.value == 'nombres') this.searchname = !this.searchname
            if (header.value == 'rut') this.searchrut = !this.searchrut
            if (header.value == 'roles') this.searchpermisos = !this.searchpermisos
        },
        removeItem(item) {
            this.filterPermisos = this.filterPermisos.filter(function (val) {
                return item !== val
            })
        },
        sortEvent(value) {
            const [field, obj] = value.sortBy
            const [order, obj_] = value.sortDesc
            this.orderBy_ = field
            this.orderType = order ? 'DESC' : 'ASC'
            this.fetchtUsers()
        },
        async fetchtUsers() {
            let params = {
                orderBy: this.orderBy_ ? this.orderBy_ : "nombre",
                orderType: this.orderType,
                pageNumber: this.page - 1,
                pageSize: this.itemsPerPage,
                isBloqueado: this.isBloqueado,
            }
            if(this.filterName)
                params['nombre'] = this.filterName
            if(this.filterRut)
                params['run'] = this.filterRut
            if(this.filterPermisos.length > 0)
                params['roles'] = this.this.filterPermisos.join(",")

            await this.$store.dispatch('usuarios/getUsers', params)   
        },
        async getUser(id) {
            this.selectedUser = null
            const resp = await this.$store.dispatch('usuarios/getUser', id)
            if (resp) {
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
                const u = resp
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
                        value: this.userRoles(u.roles)
                    },
                    {
                        label: 'Subrogante:',
                        value: u.subrogante ? u.subrogante.nombres : '-'
                    },
                    {
                        label: 'Seguidor:',
                        value: u.seguidor ? u.seguidor.map((s) => {
                            return s.nombres
                        }).join(', ') : '-'
                    },
                ]
                this.selectedUser = resp.result
                this.details_dialog = true
                this.loading = false
            }
        },
        get_tab(activetab) {
            this.activeTab = activetab
            this.isBloqueado = activetab === "Inactivos"
            this.orderBy_= "nombre"
            this.orderType = "DESC"
            this.page = 1
            this.itemsPerPage = 10
            this.filterName= ""
            this.filterRut = ""
            this.filterPermisos = []
            this.searchname = false
            this.searchrut = false
            this.searchpermisos = false
            this.fetchtUsers()
        },
        async setUserStatus() {
            const resp = await this.$store.dispatch('usuarios/setUserStatus', {
                id: this.userid,
                status: !this.isBloqueado
            })
            if(resp)
                this.fetchtUsers()
            
            this.userid = ''
            this.isBloqueado = false
            this.dialog_confirmacion = false
        },
    },
    watch: {
        page: {
            handler: function (newValue, before) {
                this.fetchtUsers()
            },
            deep: true,
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
