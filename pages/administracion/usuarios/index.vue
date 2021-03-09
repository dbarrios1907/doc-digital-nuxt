<template>
  <div class="fill-height usuarios" style="min-height: 780px">
    <dx-breadcrumbs :items="breadcrums" v-if="!ismobil" class="mb-10" />
    <dx-bodytitle class="" v-if="!ismobil">
      <template v-slot:title>
        <div class="weight-700 line-height-31 font-25">Usuarios</div>
      </template>
    </dx-bodytitle>
    <div class="weight-700 line-height-31 font-25" v-else>Usuarios</div>
    <div class="mt-10 weight-400">
      <span class="mr-2">Mostrando hasta</span>
      <v-select
        class="d-inline-flex min-content select"
        style="width: 104px"
        :items="options"
        label="Selección Simple"
        value="10"
        solo
        flat
        outlined
        v-bind="$props"
        ripple="false"
        single-line
        :menu-props="{ bottom: true, offsetY: true, openOnClick: false }"
        :class="ismobil"
      />
      <span :class="{ 'ml-3': !ismobil }">resultados de un total de <b>17 usuarios</b></span>
    </div>
    <v-row>
      <v-col sm="6" :class="[ismobil, { 'mt-8': ismobil }]">
        <dx-filtermenu label="Filtra tu búsqueda" :items="['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4']" :class="ismobil" />
        <!-- <dx-button class="line-height-24 weight-700" outlined>        
          <span class="text-underline"> Filtra tu búsqueda </span>
          <v-icon small> mdi-filter </v-icon>
        </dx-button> -->
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
      <dx-tabs :items="tabs" tabtype="default" class="users-tab mt-7">
        <template v-slot:tab-item>
          <v-tab-item>
            <DataTable
              :headers="computedHeaders"
              :items="valuess"
              :page.sync="page"
              :items-per-page="itemsPerPage"
              :class="['table-check', 'table-sm', ismobil]"
              :mobile-breakpoint="0"
              show-select
              dense
              item-key="name"
              @page-count="pageCount = $event"
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
                <v-icon
                  :class="['float-right', { focus: actived === h.value }]"
                  :key="h.value"
                  @click="openFilter(header, $event)"
                  v-if="h.filterable"
                  >mdi-filter</v-icon
                >
              </template>
              <template slot="body.prepend" v-if="searchname || searchrut || filtered">
                <tr class="body-prepend">
                  <td />
                  <td>
                    <v-text-field
                      type="text"
                      @focus="actived = 'name'"
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
                  <td v-if="!ismobil" class="filter">
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
                  </td>
                  <td />
                </tr>
              </template>

              <template v-slot:[`item.name`]="{ item: { name } }">
                <span class="breaktext">{{ name }}</span>
              </template>

              <template v-slot:[`item.access`]="{ item: { access } }">
                <v-chip v-for="v in access" :key="v" class="ml-2" color="primary" small>
                  {{ v }}
                </v-chip>
              </template>

              <template v-slot:[`item.userid`]="{ item: { userid } }">
                <nuxt-link :to="'/administracion/usuarios/editar/' + userid"
                  ><v-icon dense :class="[{ 'mr-4': !ismobil }]"> mdi-square-edit-outline </v-icon></nuxt-link
                >
                <v-icon dense :class="[{ 'mr-4': !ismobil }]" @click="open_user_details(userid)"> mdi-eye </v-icon>
                <v-icon dense> mdi-delete-outline </v-icon>
              </template>

              <template v-slot:footer>
                <div class="pt-2 v-data-footer">
                  <dx-pagination v-model="page" :length="pageCount" />
                </div>
              </template>
            </DataTable>
          </v-tab-item>
          <v-tab-item>
            <DataTable
              :headers="computedHeaders"
              :items="valuess"
              :page.sync="page"
              :items-per-page="itemsPerPage"
              :class="['table-check', 'table-sm', { ismobile: ismobil }]"
              :mobile-breakpoint="0"
              show-select
              dense
              item-key="name"
              @page-count="pageCount = $event"
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
                <v-icon
                  :class="['float-right', { focus: actived === h.value }]"
                  :key="h.value"
                  @click="openFilter(header, $event)"
                  v-if="h.filterable"
                  >mdi-filter</v-icon
                >
              </template>
              <template slot="body.prepend" v-if="searchname || searchrut || filtered">
                <tr class="body-prepend">
                  <td />
                  <td>
                    <v-text-field
                      type="text"
                      @focus="actived = 'name'"
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
                  <td v-if="!ismobil" class="filter">
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
                  </td>
                  <td />
                </tr>
              </template>

              <template v-slot:[`item.name`]="{ item: { name } }">
                <span class="breaktext">{{ name }}</span>
              </template>

              <template v-slot:[`item.access`]="{ item: { access } }">
                <v-chip v-for="v in access" :key="v" class="ml-2" color="primary" small>
                  {{ v }}
                </v-chip>
              </template>

              <template v-slot:[`item.userid`]="{ item: { userid } }">
                <nuxt-link :to="'/administracion/usuarios/editar/' + userid"
                  ><v-icon dense :class="[{ 'mr-4': !ismobil }]"> mdi-square-edit-outline </v-icon></nuxt-link
                >
                <v-icon dense :class="[{ 'mr-4': !ismobil }]" @click="open_user_details(userid)"> mdi-eye </v-icon>
                <v-icon dense> mdi-delete-outline </v-icon>
              </template>

              <template v-slot:footer>
                <div class="pt-2 v-data-footer">
                  <dx-pagination v-model="page" :length="pageCount" />
                </div>
              </template>
            </DataTable>
          </v-tab-item>
        </template>
      </dx-tabs>
    </v-row>
    <userform-details :dialog="details_dialog" :userid="selected_user">
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
  </div>
</template>

<script>
export default {
  name: 'Usuarios',
  fetch() {
    console.log('FETCH ON USERS')
  },
  data() {
    return {
      tabs: [{ tab: 'Activos' }, { tab: 'Inactivos' }],
      options: ['10', '20', '30'],
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
      page: 1,
      pageCount: 3,
      itemsPerPage: 5,
      permiso: [],
      details_dialog: false,
      selected_user: '',
      permisosValues: ['Administrador', 'Jefe de servicio', 'Operador', 'Oficina de partes'],
      valuess: [
        {
          userid: 1,
          name: 'Nombre Nombre Apellido Apellido',
          rut: '23.266.206-8',
          access: ['Administrador', 'Jefe de servicio'],
        },
        {
          userid: 2,
          name: 'Nombre2 Nombre Apellido Apellido',
          rut: '21.266.206-8',
          access: ['Administrador'],
        },
        {
          userid: 3,
          name: 'Nombre3 Nombre Apellido Apellido',
          rut: '21.256.206-8',
          access: ['Jefe de servicio'],
        },
        {
          userid: 4,
          name: 'Nombre4 Nombre Apellido Apellido',
          rut: '20.266.206-8',
          access: ['Operador'],
        },
        {
          userid: 5,
          name: 'Nombre5 Nombre Apellido Apellido',
          rut: '20.200.206-8',
          access: ['Jefe de servicio'],
        },
        {
          userid: 6,
          name: 'Nombre6 Nombre Apellido Apellido',
          rut: '24.266.206-8',
          access: ['Oficina de partes'],
        },
        {
          userid: 7,
          name: 'Nombre7 Nombre Apellido Apellido',
          rut: '25.266.206-8',
          access: ['Administrador'],
        },
        {
          userid: 8,
          name: 'Nombre8 Nombre Apellido Apellido',
          rut: '25.366.206-8',
          access: ['Operador'],
        },
        {
          userid: 9,
          name: 'Nombre9 Nombre Apellido Apellido',
          rut: '26.266.206-8',
          access: ['Operador'],
        },
        {
          userid: 10,
          name: 'Nombre10 Nombre Apellido Apellido',
          rut: '27.266.206-8',
          access: ['Oficina de partes'],
        },
      ],
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
      return value.toLowerCase().includes(this.filterValue.toLowerCase())
    },
    nameFilter1(value) {
      if (!this.filterRut) {
        return true
      }
      return value.includes(this.filterRut)
    },
    activeSearch(header, value) {
      event.stopPropagation()
      if (header.value == 'name') this.searchname = !this.searchname
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
    open_user_details(id) {
      this.selected_user = id.toString()
      this.details_dialog = true
    },
  },
  computed: {
    ismobil() {
      return this.$vuetify.breakpoint.xs ? 'ismobile' : ''
    },
    computedHeaders() {
      return this.headers.filter(h => (this.$vuetify.breakpoint.xs ? h.value == 'name' || h.value == 'actions' : h.value))
    },
    headers() {
      return [
        {
          text: 'Nombre',
          align: 'start',
          sortable: true,
          value: 'name',
          filter: this.nameFilter,
          search: true,
        },
        { text: 'Rut', value: 'rut', sortable: true, filter: this.nameFilter1, search: true },
        { text: 'Permisos', value: 'access', filterable: true, sortable: false, filter: this.permisosFilter },
        { text: 'Acciones', value: 'userid', sortable: false },
      ]
    },
  },
}
</script>
<style>
.v-select .v-input__slot {
  min-height: 48px !important;
}

table a {
  text-decoration: none;
}

.v-application .usuarios .tab-default .v-tab--active {
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
</style>
