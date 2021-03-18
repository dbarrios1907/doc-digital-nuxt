<template>
  <div class="fill-height usuarios" style="min-height: 780px">
    <dx-breadcrumbs v-if="!ismobil" :items="breadcrums" class="mb-10" />
    <dx-bodytitle class="">
      <template v-slot:title>
        <div class="weight-700 line-height-31 font-25">Usuarios</div>
      </template>
    </dx-bodytitle>
    <div v-if="!isListEmpty" class="mt-10 weight-400" :class="[{ 'px-4': ismobil }]">
      <span class="mr-2">Mostrando hasta</span>
      <v-select
        v-if="activeTab === 'Activos'"
        v-model="itemsPerPageUA"
        class="d-inline-flex min-content select"
        style="width: 104px"
        :items="options"
        label="5"
        value="5"
        solo
        flat
        outlined
        v-bind="$props"
        ripple="false"
        single-line
        :menu-props="{ bottom: true, offsetY: true, openOnClick: false }"
        :class="ismobil"
      />
      <v-select
        v-else
        v-model="itemsPerPageUI"
        class="d-inline-flex min-content select"
        style="width: 104px"
        :items="options"
        label="5"
        value="5"
        solo
        flat
        outlined
        v-bind="$props"
        ripple="false"
        single-line
        :menu-props="{ bottom: true, offsetY: true, openOnClick: false }"
        :class="ismobil"
      />
      <span :class="{ 'ml-3': !ismobil }">resultados de un total de <b>{{countUsuarios + (countUsuarios > 1 ?  ' usuarios' : ' usuario')}}</b></span>
    </div>
    <dx-alert
      v-else
      class="mb-9 mt-10 custom-alert font-14 line-height-18 elevation-0"
      :class="[{ 'px-4': ismobil }]"
      absolute
      bottom
      right
      type="error"
      outlined
      :show-left-icon="false"
      :show-right-icon="false"
    >
      No se han encontrado coincidencias.
    </dx-alert>
    <v-row :class="[{ 'px-4': ismobil }]">
      <v-col sm="6" :class="[ismobil, { 'mt-8': ismobil }]">
        <dx-filtermenu label="Filtra tu búsqueda" :items="['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4']" :class="ismobil" />
      </v-col>
      <v-col sm="6" :class="[ismobil, { 'd-flex justify-end align-center': !ismobil }, { 'mt-5': ismobil }]">
        <NuxtLink to="/administracion/usuarios/insertar" class="text-underline weight-700 font-title"> + Agregar Usuario</NuxtLink>
      </v-col>
    </v-row>
    <v-row class="mt-4">
      <div class="actions-menu mt-7 d-none d-md-flex d-lg-flex d-xl-flex">
        <v-menu offset-y>
          <template v-slot:activator="{ attrs, on }">
            <dx-button text class="pr-1 pl-2" v-bind="attrs" v-on="on">
              <span class="text-underline line-height-24 weight-400" :class="actionColor">Acción masiva</span>
              <dx-icon right regular class="ml-4"> mdi-chevron-down </dx-icon>
            </dx-button>
          </template>
          <v-list>
            <v-list-item v-for="item in actionitems" :key="item" link>
              <v-list-item-title>
                <span class="text-underline line-height-24 weight-400" :class="actionColor"> {{ item }} </span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <dx-tabs :items="tabs" tabtype="default" class="users-tab mt-7" @getActiveTab="get_tab">
        <template v-slot:tab-item>
          <v-tab-item>
            <DataTable
              :headers="computedHeaders"
              :items="usuariosActivos"
              :page.sync="pageUA"
              :items-per-page="getItemsPerPages(itemsPerPageUA)"
              :class="['table-check', 'table-sm', ismobil]"
              :mobile-breakpoint="0"
              :show-select="!ismobil"
              dense
              :item-key="'nombres' + Math.random().toString()"
              @page-count="pageCountUA = $event"
              hide-default-footer
              calculate-widths
            >
             <template v-for="h in computedHeaders" v-slot:[`header.${h.value}`]="{ header }" class="column">
                {{ h.text }}
                <v-icon
                  :class="[{ iconsearch: h.search }, { focus: actived === h.value }]"
                  :key="h.value"
                  @click="activeSearch(header, $event)"
                  v-if="h.search"
                  >mdi-magnify</v-icon
                >
                <!-- <v-icon
                  :class="['float-right', { focus: actived === h.value }]"
                  :key="h.value"
                  @click="openFilter(header, $event)"
                  v-if="h.filterable"
                  >mdi-filter</v-icon
                > -->
              </template>
              <template slot="body.prepend" v-if="searchname || searchrut || filtered">
                <tr class="body-prepend">
                  <td />
                  <td>
                    <v-text-field
                      type="text"
                      @focus="actived = 'nombres'"
                      hide-details
                      solo
                      flat
                      outlined
                      v-model="filterValue"
                      label="Nombre"
                      v-if="searchname"
                    />
                  </td>
                  <td v-if="!ismobil">
                    <v-text-field
                      type="text"
                      @focus="actived = 'rut'"
                      hide-details
                      solo
                      flat
                      outlined
                      v-model="filterRut"
                      label="Rut"
                      v-if="searchrut"
                    />
                  </td>
                  <td />
                  <!-- <td v-if="!ismobil" class="filter">
                    <dx-select
                      :ripple="false"
                      v-model="permiso"
                      :items="permisosValues"
                      chips
                      label="Filtra por permisos"
                      persistent-hint
                      multiple
                      flat
                      hide-details
                      outlined
                      :menu-props="{ bottom: true, offsetY: true, openOnClick: false }"
                      v-if="filtered"
                      @click="actived = 'access'"
                      @blur="actived = null"
                    >
                      <template v-slot:selection="{ item, index }">
                        <Badge type="tertiary" label outlined class="ma-0">
                          <div class="darken3--text font-16 line-height-22 weight-400">{{ item }}</div>
                          <dx-icon left class="darken3--text ml-2 mr-0" @click.prevent="removeItem(item)"> mdi-close </dx-icon>
                        </Badge>
                      </template>
                    </dx-select>
                  </td> -->
                  <td />
                </tr>
              </template>

              <template v-slot:[`item.nombres`]="{ item: { nombres } }">
                <span class="breaktext">{{ nombres }}</span>
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
                <nuxt-link :to="'/administracion/usuarios/editar/' + id"
                  ><v-icon dense :class="[{ 'mr-4': !ismobil }, { 'mx-4': ismobil }]"> mdi-square-edit-outline </v-icon></nuxt-link
                >
                <v-icon dense class="mr-4" @click="open_user_details(id)"> mdi-eye </v-icon>
                <v-icon dense @click="userid = id, dialog_confirmacion = true"> mdi-delete-outline </v-icon>
              </template>

              <template v-slot:footer>
                <div :class="['pt-4 v-data-footer', ismobil]">
                  <dx-pagination v-model="pageUA" :length="pageCountUA" />
                </div>
              </template>
            </DataTable>
          </v-tab-item>
          <v-tab-item>
            <DataTable
              :headers="computedHeaders"
              :items="usuariosInactivos"
              :page.sync="pageUI"
              :items-per-page="getItemsPerPages(itemsPerPageUI)"
              :class="['table-check', 'table-sm', ismobil]"
              :mobile-breakpoint="0"
              show-select
              dense
              :item-key="'nombres' + Math.random().toString()"
              hide-default-footer
              calculate-widths
              @page-count="pageCountUI = $event"
            >
              <template v-for="h in computedHeaders" v-slot:[`header.${h.value}`]="{ header }" class="column">
                {{ h.text }}
                <v-icon
                  v-if="h.search"
                  :key="h.value"
                  :class="[{ iconsearch: h.search }, { focus: actived === h.value }]"
                  @click="activeSearch(header, $event)"
                >
                  mdi-magnify
                </v-icon>
                <v-icon
                  v-if="h.filterable"
                  :key="h.value"
                  :class="['float-right', { focus: actived === h.value }]"
                  @click="openFilter(header, $event)"
                >
                  mdi-filter
                </v-icon>
              </template>
              <template v-if="searchname || searchrut || filtered" slot="body.prepend">
                <tr class="body-prepend">
                  <td />
                  <td>
                    <v-text-field
                      v-model="filterValue"
                      type="text"
                      hide-details
                      solo
                      v-if="searchname"
                      flat
                      outlined
                      label="Nombre"
                      @focus="actived = 'name'"
                    />
                  </td>
                  <td v-if="!ismobil">
                    <v-text-field
                      v-model="filterRut"
                      type="text"
                      hide-details
                      solo
                      v-if="searchrut"
                      flat
                      outlined
                      label="Rut"
                      @focus="actived = 'rut'"
                    />
                  </td>
                  <td v-if="!ismobil" class="filter">
                    <dx-select
                      v-model="permiso"
                      v-if="filtered"
                      :ripple="false"
                      :items="permisosValues"
                      chips
                      label="Filtra por permisos"
                      persistent-hint
                      multiple
                      flat
                      hide-details
                      outlined
                      :menu-props="{ bottom: true, offsetY: true, openOnClick: false }"
                      @click="actived = 'access'"
                      @blur="actived = null"
                    >
                      <template v-slot:selection="{ item }">
                        <Badge type="tertiary" label outlined class="ma-0">
                          <div class="darken3--text font-16 line-height-22 weight-400">{{ item }}</div>
                          <dx-icon left class="darken3--text ml-2 mr-0" @click.prevent="removeItem(item)"> mdi-close </dx-icon>
                        </Badge>
                      </template>
                    </dx-select>
                  </td>
                  <td />
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
                <nuxt-link :to="'/administracion/usuarios/editar/' + id"
                  ><v-icon dense :class="[{ 'mr-4': !ismobil }, { 'mx-4': ismobil }]"> mdi-square-edit-outline </v-icon></nuxt-link
                >
                <v-icon dense class="mr-4" @click="open_user_details(id)"> mdi-eye </v-icon>
                <v-icon dense @click="userid = id, dialog_confirmacion = true"> mdi-delete-outline </v-icon>
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
    <userform-details :dialog="details_dialog" :user="selectedUser">
      <template v-slot:actionclose>
        <v-btn icon color="darken3" @click="details_dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
      <template v-slot:actions>
        <dx-button color="primary" outlined v-bind="$props" class="text-none" :to="'/administracion/usuarios/editar/' + selected_user">
          <span class="text-underline"> Editar </span>
        </dx-button>
        <dx-button
          color="white"
          outlined
          v-bind="$props"
          :class="[{ 'ml-4': ismobil }]"
          class="text-none mr-2 primary"
          @click="details_dialog = false"
        >
          <span class="text-underline"> Cerrar </span>
        </dx-button>
      </template>
    </userform-details>
    <v-dialog
      v-model="dialog_confirmacion"
      persistent
      max-width="290"
    >
       <v-card>
        <v-card-title class="headline">
          Confirmación
        </v-card-title>
        <v-card-text>¿Realmente desea eliminar el usuario?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          
          <dx-button
            color="white"
            outlined
            v-bind="$props"
            :class="[{ 'ml-4': ismobil }]"
            class="text-none mr-2 primary"
            @click="deleteUser(userid)"
          >
            <span class="text-underline"> Eliminar </span>
          </dx-button>
          <dx-button color="primary" outlined v-bind="$props" class="text-none" @click="dialog_confirmacion = false, userid = ''">
            <span class="text-underline"> Cancelar </span>
          </dx-button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { isArray } from '~/shared/utils/array'
import { isValidResponse } from '~/shared/utils/request'
export default {
  name: 'Usuarios',
  fetch() {
    // console.log('FETCH ON USERS')
    this.$store.dispatch('usuarios/getUsers')
  },
  data() {
    return {      
      tabs: [{ tab: 'Activos' }, { tab: 'Inactivos' }],
      activeTab: 'Activos',
      options: ['5', '10', '20', '30'],
      breadcrums: [
        {
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
      dialog_confirmacion : false,
      selected_user: '',
      permisosValues: ['Administrador', 'Jefe de servicio', 'Operador', 'Oficina de partes'],
      loading: false,
      selectedUser: null,
      userid : '',
      userRoles:[
        {
          key : 'ROLE_USUARIO',
          name : 'Operador'
        },
        {
          key : 'ROLE_VER_RESERVADOS',
          name : 'Ver reservados'
        },
        {
          key : 'ROLE_OFICINA_PARTES',
          name : 'Oficina de partes'
        },
        {
          key : 'ROLE_ADMIN',
          name : 'Administrador'
        },
        {
          key : 'ROLE_JEFE_SERVICIO',
          name : 'Jefe de servicio'
        },
        {
          key : 'ROLE_SUPERADMIN',
          name : 'Súper administrador'
        }
      ]
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
      return [
        {
          text: 'Nombre',
          align: 'start',
          sortable: true,
          value: 'nombres',
          filter: this.nameFilter,
          search: true,
        },
        { text: 'Rut', value: 'rut', sortable: true, filter: this.rutFilter, search: true },
        { text: 'Permisos', value: 'access', filterable: true, sortable: false, filter: this.permisosFilter },
        { text: 'Acciones', value: 'actions', sortable: false },
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
    countUsuarios(){
      const activos = this.$store.getters['usuarios/getActivos']
      const inactivos = this.$store.getters['usuarios/getInctivos']
      if (this.activeTab === 'Activos') return activos.length
      else return inactivos.length
    }
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
    async open_user_details(id) {
      this.selected_user = id.toString()
      let resp = null
      this.selectedUser = null
      this.loading = true
      try{ 
        resp = await this.$store.dispatch('usuarios/getUser', this.selected_user)
      }catch(error) {}

      const [valid, Toast] = isValidResponse(resp)

      if (!valid) {
        Toast.error({
          message: 'Usuario no encontrado',
        })
      }
      else{
        this.selectedUser = resp.result        
        this.details_dialog = true
        this.loading = false
      }
    },
    get_tab(activetab) {
      this.activeTab = activetab
    },
    async deleteUser(id){
      let resp = null
      try{
        resp = await this.$store.dispatch('usuarios/deleteUser', id)
      }
      catch(err){ 
        Toast.error({
          message: 'Ha ocurrido un error',
        })
      }

      const [valid, Toast] = isValidResponse(resp)

      if (!valid) {
        Toast.error({
          message: 'No se pudo eliminar el usuario',
        })
      }
      else{
        Toast.success({
          message: 'Usuario eliminado',
        })
        this.userid = '' 
        this.dialog_confirmacion = false
      }
    },
    getItemsPerPages(itemsperpage){
      let items = isArray(itemsperpage) ? itemsperpage[0] : itemsperpage
      return parseInt(items)
    },
    getUserRole(role){
       return this.userRoles.find(r => r.key === role).name;
    }
  },
}
</script>
<style lang="scss" sooped >
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

.v-text-field--outlined > .v-input__control > .v-input__slot {
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
.custom-alert > div {
  margin: 0px auto;
  text-align: center;
}
.custom-alert > div .dx-alert__content {
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
.usuarios {
  table > tbody > tr > td {
      padding: 6px 10px !important;
  }
  :not(.ismobile){
    table > thead > tr > th:nth-child(3){
      max-width: 250px !important;
      width: 17% !important;
    }
    
    table > thead > tr > th:nth-child(4){
      width: 42% !important;
    }
    
  }
  .ismobile {
    table > tbody > tr {
      height: 37px !important;
    }
    table > tbody > tr > td:nth-child(2),
    table > thead > tr > th:nth-child(2) {
      text-align: center;
    }
    .dx-pagination {
      margin: 0px auto !important;
    }
  }
}
</style>
