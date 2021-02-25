<template>
  <div>
    <DataTable
      :headers="headers"
      :items="valuess"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      class="table-sm"
      show-select
      dense
      item-key="name"
      hide-default-footer
      @page-count="pageCount = $event"
    >
      <template v-for="h in headers" v-slot:[`header.${h.value}`]="{ header }" class="column">
        {{ h.text }}
        <v-icon
          v-if="h.search"
          :key="h.value"
          :class="[{ iconsearch: h.search }, { focus: actived === h.value }]"
          @click="activeSearch(header, $event)"
        >
          mdi-magnify
        </v-icon>
        <v-icon v-if="h.filterable" :key="h.value" :class="['float-right', { focus: actived === h.value }]" @click="openFilter(header, $event)">
          mdi-filter
        </v-icon>
      </template>
      <template v-if="searchname || searchrut || filtered" slot="body.prepend">
        <tr class="body-prepend">
          <td />
          <td>
            <v-text-field
              type="text"
              v-model="filterValue"
              hide-details
              solo
              flat
              v-if="searchname"
              outlined
              label="Nombre"
              @focus="actived = 'name'"
            />
          </td>
          <td>
            <v-text-field type="text" v-model="filterRut" hide-details solo flat v-if="searchrut" outlined label="Rut" @focus="actived = 'rut'" />
          </td>
          <td>
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

      <!--<template v-slot:top>
        <dx-tabs class="mt-5" :items="items" hide-on-leave tabtype="default">
        </dx-tabs>
      </template>
      -->
      <template v-slot:[`item.access`]="{ item: { access } }">
        <v-chip v-for="v in access" :key="v" class="ml-2" color="primary" small>
          {{ v }}
        </v-chip>
      </template>

      <template v-slot:[`item.actions`]>
        <v-icon dense class="mr-4"> mdi-square-edit-outline </v-icon>
        <v-icon dense class="mr-4"> mdi-eye </v-icon>
        <v-icon dense> mdi-delete-outline </v-icon>
      </template>

      <template v-slot:footer>
        <div class="pt-2 v-data-footer">
          <dx-pagination v-model="page" :length="pageCount" />
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { tab: 'Activos', number: 0 },
        { tab: 'Inactivos', number: 0 },
      ],
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
      permisosValues: ['Administrador', 'Jefe de servicio', 'Operador', 'Oficina de partes'],
      valuess: [
        {
          name: 'Nombre Nombre Apellido Apellido',
          rut: '23.266.206-8',
          access: ['Administrador', 'Jefe de servicio'],
        },
        {
          name: 'Nombre2 Nombre Apellido Apellido',
          rut: '21.266.206-8',
          access: ['Administrador'],
        },
        {
          name: 'Nombre3 Nombre Apellido Apellido',
          rut: '21.256.206-8',
          access: ['Jefe de servicio'],
        },
        {
          name: 'Nombre4 Nombre Apellido Apellido',
          rut: '20.266.206-8',
          access: ['Operador'],
        },
        {
          name: 'Nombre5 Nombre Apellido Apellido',
          rut: '20.200.206-8',
          access: ['Jefe de servicio'],
        },
        {
          name: 'Nombre6 Nombre Apellido Apellido',
          rut: '24.266.206-8',
          access: ['Oficina de partes'],
        },
        {
          name: 'Nombre7 Nombre Apellido Apellido',
          rut: '25.266.206-8',
          access: ['Administrador'],
        },
        {
          name: 'Nombre8 Nombre Apellido Apellido',
          rut: '25.366.206-8',
          access: ['Operador'],
        },
        {
          name: 'Nombre9 Nombre Apellido Apellido',
          rut: '26.266.206-8',
          access: ['Operador'],
        },
        {
          name: 'Nombre10 Nombre Apellido Apellido',
          rut: '27.266.206-8',
          access: ['Oficina de partes'],
        },
      ],
    }
  },

  computed: {
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
        { text: 'Acciones', value: 'actions', sortable: false },
      ]
    },
  },
  methods: {
    onResize() {
      if (window.innerWidth < 769) this.isMobile = true
      else this.isMobile = false
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
  },
}
</script>
