<template>
  <div>
    <DataTable
      color="primary"
      :headers="computedHeaders"
      :items="valuess"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :class="['table-xl', { 'icon-sort-left': isleft }, {'ismobile': ismobil}]"
      :mobile-breakpoint="0"
      hide-default-footer
      show-select
      item-key="tema"
      @page-count="pageCount = $event"
    >
      <template v-slot:[`item.tema`]="{ item: { tema, href } }" class="column">
        <a class="breaktext" :href="href">{{ tema }}</a>
      </template>

      <template v-slot:[`item.access`]="{ item: { access } }">
        <v-chip v-for="v in access" :key="v" class="ml-2" color="primary" small>
          {{ v }}
        </v-chip>
      </template>

      <template v-slot:[`item.actions`]>
        <v-icon dense :class="[{'mr-4': !ismobil}]"> mdi-square-edit-outline </v-icon>
        <v-icon dense :class="[{'mr-4': !ismobil}]"> mdi-eye </v-icon>
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
    ismobil (){
      return this.$vuetify.breakpoint.xs
    },
    computedHeaders () {
      return this.headers.filter(h => this.$vuetify.breakpoint.xs ? (h.value == "tema" || h.value == "actions"): h.value)
    },
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
