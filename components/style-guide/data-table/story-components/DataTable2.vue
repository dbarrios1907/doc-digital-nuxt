<template>
  <div>
    <DataTable
      color="primary"
      :headers="headers"
      :items="valuess"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      :class="['table-xl', { 'icon-sort-left': isleft }]"
      show-select
      item-key="tema"
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
        <v-icon dense class="mr-4"> mdi-square-edit-outline </v-icon>
        <v-icon dense class="mr-4"> mdi-eye </v-icon>
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
      valuess: [
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
  computed: {
    headers() {
      return [
        {
          text: 'Tema',
          align: 'start',
          value: 'tema',
          sortable: true,
        },
        { text: 'Tipo', value: 'tipo', sortable: true },
        { text: 'Folio', value: 'folio', sortable: true },
        { text: 'Creación', value: 'creacion', sortable: true },
        { text: 'Entidad emisora', value: 'entidad', sortable: true },
        { text: 'Actualización', value: 'actualizacion', sortable: true },
        { text: 'Acciones', value: 'actions', sortable: false },
      ]
    },
  },
}
</script>
