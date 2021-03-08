<template>
  <div class="fill-height entidades" style="min-height: 780px">
    <dx-breadcrumbs :items="breadcrums" v-if="!ismobil" class="mb-10" />
    <dx-bodytitle class="" v-if="!ismobil">
      <template v-slot:title>
        <div class="weight-700 line-height-31 font-25">Entidades</div>
      </template>
    </dx-bodytitle>
    <div class="weight-700 line-height-31 font-25" v-else>Entidades</div>
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
      <span :class="{ 'ml-3': !ismobil }">resultados de un total de <b>17 entidades</b></span>
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
        <NuxtLink to="/administracion/entidades/insertar" class="text-underline weight-700 font-title"> + Agregar Entidad</NuxtLink>
      </v-col>
    </v-row>
    <v-row class="mt-6">
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
          <v-icon :class="['float-right', { focus: actived === h.value }]" :key="h.value" @click="openFilter(header, $event)" v-if="h.filterable"
            >mdi-filter</v-icon
          >
        </template>
        <template slot="body.prepend" v-if="searchname || searchid || filtered">
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
              <v-text-field type="text" @focus="actived = 'id'" hide-details solo flat outlined v-model="filterid" label="id" v-if="searchid" />
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

        <template v-slot:[`item.entidadid`]="{ item: { entidadid } }">
          <nuxt-link :to="'/administracion/entidades/editar/' + entidadid"
            ><v-icon dense :class="[{ 'mr-4': !ismobil }]"> mdi-square-edit-outline </v-icon></nuxt-link
          >
          <v-icon dense :class="[{ 'mr-4': !ismobil }]" @click="open_entidad_details(entidadid)"> mdi-eye </v-icon>
          <v-icon dense> mdi-delete-outline </v-icon>
        </template>

        <template v-slot:footer>
          <div class="pt-2 v-data-footer">
            <dx-pagination v-model="page" :length="pageCount" />
          </div>
        </template>
      </DataTable>
    </v-row>
    <userform-details :dialog="details_dialog" :entidadid="selected_entidad">
      <template v-slot:actionclose>
        <v-btn icon color="darken3" @click="details_dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
      <template v-slot:actions>
        <dx-button color="primary" outlined v-bind="$props" class="text-none" :to="'/administracion/entidades/editar/' + selected_entidad">
          <span class="text-underline"> Editar </span>
        </dx-button>
        <dx-button color="white" outlined v-bind="$props" class="text-none mr-2 primary" @click="details_dialog = false">
          <span class="text-underline"> Cerrar </span>
        </dx-button>
      </template>
    </userform-details>
  </div>
</template>

<script>
export default {
  name: 'entidades',
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
      isleft: true,
      page: 1,
      pageCount: 3,
      itemsPerPage: 5,
      permiso: [],
      details_dialog: false,
      selected_entidad: '',
      permisosValues: ['Administrador', 'Jefe de servicio', 'Operador', 'Oficina de partes'],
      valuess: [
        {
          entidadid: 1,
          name: 'Nombre Entidad',
          id: '132',
          entidaddep: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          entidadid: 2,
          name: 'Nombre2 Entidad',
          id: '133',
          entidaddep: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          entidadid: 3,
          name: 'Nombre3 Entidad',
          id: '134',
          entidaddep: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          entidadid: 4,
          name: 'Nombre4 Entidad',
          id: '135',
          entidaddep: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          entidadid: 5,
          name: 'Nombre5 Entidad',
          id: '136',
          entidaddep: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          entidadid: 6,
          name: 'Nombre6 Entidad',
          id: '137',
          entidaddep: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          entidadid: 7,
          name: 'Nombre7 Entidad',
          id: '138',
          entidaddep: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          entidadid: 8,
          name: 'Nombre8 Entidad',
          id: '139',
          entidaddep: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          entidadid: 9,
          name: 'Nombre9 Entidad',
          id: '140',
          entidaddep: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          entidadid: 10,
          name: 'Nombre10 Entidad',
          id: '141',
          entidaddep: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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
    idFilter(value) {
      if (!this.filterid) {
        return true
      }
      return value.includes(this.filterid)
    },
    activeSearch(header, value) {
      event.stopPropagation()
      if (header.value == 'name') this.searchname = !this.searchname
      if (header.value == 'id') this.searchid = !this.searchid
    },
    removeItem(item) {
      this.permiso = this.permiso.filter(function (val) {
        return item !== val
      })
    },
    entdepFilter(value) {
      let flag = false
      if (this.permiso.length == 0) return true

      value.filter(function (e) {
        flag = this.indexOf(e) > -1
      }, this.permiso)

      return flag
    },
    open_entidad_details(id) {
      this.selected_entidad = id.toString()
      this.details_dialog = true
    },
  },
  computed: {
    ismobil() {
      return this.$vuetify.breakpoint.xs ? 'ismobile' : ''
    },
    computedHeaders() {
      return this.headers.filter(h => (this.$vuetify.breakpoint.xs ? h.value == 'name' || h.value == 'entidadid' : h.value))
    },
    headers() {
      return [
        { text: 'Id', value: 'id', sortable: true, search: false },
        {
          text: 'Nombre',
          align: 'start',
          sortable: true,
          value: 'name',
          filter: this.nameFilter,
          search: true,
        },
        { text: 'Entidad dependiente', value: 'entidaddep', filterable: true, sortable: false, filter: this.entdepFilter },
        { text: 'Acciones', value: 'entidadid', sortable: false },
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

.v-application .entidades .tab-default .v-tab--active {
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

.v-application .v-menu__content.theme--light.menuable__content__active,
.v-application .v-menu__content.theme--dark.menuable__content__active {
  margin-top: 0px !important;
  border: 0px !important;
  box-shadow: none !important;
}

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

.entidades table tr th:nth-child(2) {
  width: 90px;
}
</style>
