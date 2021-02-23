<template>
  <div>
    <dx-breadcrumbs :items="breadcrums" />
    <dx-bodytitle>
      <template v-slot:title>
        <div class="weight-700 text-md-h4 mt-3 line-height-31">{{ title }}</div>
      </template>
      <template v-slot:subtitle>
        <div class="weight-400 mt-4 font-16">{{ subtitle }}</div>
      </template>
    </dx-bodytitle>
    <div class="table-container mt-8">
      <div class="mt-10 weight-400">
        <span class="mr-2">Mostrando hasta</span>
        <v-select
          class="d-inline-flex min-content mx-1"
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
        />
        <span class="ml-3">resultados de un total de <b>17 usuarios</b></span>
      </div>
      <v-row>
        <v-col sm="6">
          <dx-button class="line-height-24 weight-700 mr-4" outlined>
            <span class="text-underline"> Filtra tu búsqueda </span>
            <v-icon small> mdi-filter </v-icon>
          </dx-button>
        </v-col>
        <v-col sm="6" class="text-right">
          <v-icon small> mdi-file-download-outline </v-icon>
          <a href="#" class="text-underline"> Descargar listado</a>
        </v-col>
      </v-row>
      <div>
        <DataTable
          color="primary"
          :headers="headers"
          :items="values"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-1 mt-5"
          show-select
          @page-count="pageCount = $event"
        >
          <template v-slot:[`item.data-table-select`]="{ isSelected, select }">
            <v-simple-checkbox color="primary" :value="isSelected" @input="select($event)" />
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
        <div class="pt-2 mr-6">
          <dx-pagination v-model="page" :length="pageCount" class="float-right" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { constantRoutes } from '../../routes'
export default {
  name: 'Documentos',
  data() {
    return {
      currentroute: '',
      title: '',
      subtitle: '',
      options: ['10', '20', '30'],
      breadcrums: [
        {
          text: 'Administración',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Documentos',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
      drawer: true,
      items: constantRoutes,
      right: null,
      open: [1, 2],
      tree: null,
      caseSensitive: false,
      page: 1,
      pageCount: 3,
      itemsPerPage: 10,
      headers: [
        {
          text: 'Tema',
          align: 'start',
          sortable: true,
          value: 'tema',
          filterable: true,
        },
        { text: 'Tipo', value: 'tipo', filterable: true },
        { text: 'Folio', value: 'folio', sortable: true },
        { text: 'Creación', value: 'creacion', sortable: true },
        { text: 'Actualización', value: 'actualizacion', sortable: true },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      values: [
        {
          tema: 'Instructivo de Modernización',
          tipo: 'Oficio',
          folio: '-',
          creacion: '10-09-2020 9:58',
          actualizacion: '10-09-2020 9:58',
        },
        {
          tema: 'Oficio ORD Permisos Administrativos',
          tipo: 'Oficio',
          folio: '178',
          creacion: '10-09-2020 9:58',
          actualizacion: '10-09-2020 9:58',
        },
        {
          tema: 'Circular normativa de Teletrabajo',
          tipo: 'Oficio',
          folio: '-',
          creacion: '10-09-2020 9:58',
          actualizacion: '10-09-2020 9:58',
        },
      ],
    }
  },
  watch: {
    $route(to, from) {
      this.currentroute = to.name
      switch (this.$router.currentRoute.name) {
        case 'Enviados':
          this.title = 'Documentos enviados'
          this.subtitle = 'Aquí podrás revisar documentos que se han enviado a otras Instituciones.'
          break
        case 'Recibidos':
          this.title = 'Documentos recibidos'
          this.subtitle = 'Aquí podrás revisar documentos que le han enviado a tu Institución.'
          break

        default:
          this.title = 'Documentos por firmar'
          this.subtitle = 'Aquí podrás revisar documentos que autoridades de tu Institución tienen pendientes por firmar.'
          break
      }
    },
  },
  created() {
    this.currentroute = this.$router.currentRoute.name
    switch (this.$router.currentRoute.name) {
      case 'Enviados':
        this.title = 'Documentos enviados'
        this.subtitle = 'Aquí podrás revisar documentos que se han enviado a otras Instituciones.'
        break
      case 'Recibidos':
        this.title = 'Documentos recibidos'
        this.subtitle = 'Aquí podrás revisar documentos que le han enviado a tu Institución.'
        break

      default:
        this.title = 'Documentos por firmar'
        this.subtitle = 'Aquí podrás revisar documentos que autoridades de tu Institución tienen pendientes por firmar.'
        break
    }
  },
}
</script>
