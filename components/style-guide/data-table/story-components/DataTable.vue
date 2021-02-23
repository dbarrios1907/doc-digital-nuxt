<template>
  <div>
    <DataTable
      color="primary"
      :headers="headers1"
      :items="values1"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      :class="['table-xl', { 'icon-sort-left': isleft }]"
      show-select
      @page-count="pageCount = $event"
    >
      <template v-slot:[`item.tema`]="{ item: { tema, href } }" class="column">
        <a :href="href">{{ tema }}</a>
      </template>

      <template v-slot:[`item.access`]="{ item: { access } }">
        <v-chip v-for="v in access" :key="v" class="ml-2" color="primary" small>
          {{ v }}
        </v-chip>
      </template>

      <template v-slot:[`item.actions`]>
        <v-icon dense class="mr-2"> mdi-square-edit-outline </v-icon>
        <v-icon dense class="mr-2"> mdi-eye </v-icon>
        <v-icon dense> mdi-delete </v-icon>
      </template>
    </DataTable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isleft: true,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        {
          text: 'Nombre',
          align: 'start',
          sortable: true,
          value: 'name',
          filterable: true,
        },
        { text: 'Rut', value: 'rut', filterable: true },
        { text: 'Permisos', value: 'access', sortable: true },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      values: [
        {
          name: 'Frozen Yogurt',
          rut: '23.266.206-8',
          access: ['Administrador', 'Jefe de servicios'],
          href: '#',
        },
        {
          name: 'Ice cream sandwich',
          rut: '23.266.206-8',
          access: ['Jefe de servicios'],
          href: '#',
        },
        {
          name: 'Eclair',
          rut: '23.266.206-8',
          access: ['Jefe de servicios'],
          href: '#',
        },
        {
          name: 'Cupcake',
          rut: '23.266.206-8',
          access: ['Operador'],
          href: '#',
        },
        {
          name: 'Gingerbread',
          rut: '23.266.206-8',
          access: ['Oficina de partes', 'Jefe de servicios'],
          href: '#',
        },
        {
          name: 'Jelly bean',
          rut: '23.266.206-8',
          access: ['Administrador'],
          href: '#',
        },
        {
          name: 'Lollipop',
          rut: '23.266.206-8',
          access: ['Administrador', 'Jefe de servicios'],
          href: '#',
        },
        {
          name: 'Honeycomb',
          rut: '23.266.206-8',
          access: ['Administrador', 'Jefe de servicios'],
          href: '#',
        },
        {
          name: 'Donut',
          rut: '23.266.206-8',
          access: ['Administrador', 'Jefe de servicios'],
          href: '#',
        },
        {
          name: 'KitKat',
          rut: '23.266.206-8',
          access: ['Operador', 'Jefe de servicios'],
          href: '#',
        },
      ],
      headers1: [
        {
          text: 'Tema',
          align: 'start',
          value: 'tema',
        },
        { text: 'Tipo', value: 'tipo', sortable: true },
        { text: 'Folio', value: 'folio', sortable: true },
        { text: 'Creación', value: 'creacion', sortable: true },
        { text: 'Entidad emisora', value: 'entidad', sortable: true },
        { text: 'Actualización', value: 'actualizacion', sortable: true },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      values1: [
        {
          tema: 'Instructivo de Modernización',
          tipo: 'Oficio',
          folio: '-',
          creacion: '10-09-2020 9:58',
          entidad: 'Nombre entidad',
          actualizacion: '10-09-2020 9:58',
          href: '#',
        },
        {
          tema: 'Oficio ORD Permisos Administrativos',
          tipo: 'Oficio',
          folio: '178',
          creacion: '10-09-2020 9:58',
          entidad: 'Nombre entidad',
          actualizacion: '10-09-2020 9:58',
          href: '#',
        },
        {
          tema: 'Circular normativa de Teletrabajo',
          tipo: 'Oficio',
          folio: '-',
          creacion: '10-09-2020 9:58',
          entidad: 'Nombre entidad',
          actualizacion: '10-09-2020 9:58',
          href: '#',
        },
      ],
    }
  },
  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = []
      else this.selected = this.desserts.slice()
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
    getColor(calories) {
      if (calories > 400) return 'red'
      else if (calories > 200) return 'orange'
      else return 'green'
    },
    openFilter(header, event) {
      event.stopPropagation()
      alert('test')
    },
  },
}
</script>
