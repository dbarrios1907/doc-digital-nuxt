<template>
  <div class="fill-height">
    <dx-breadcrumbs :items="breadcrums" />
    <dx-bodytitle>
      <template v-slot:title>
        <div class="weight-700 text-md-h4 mt-3 line-height-31">Usuarios</div>
      </template>
    </dx-bodytitle>
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
        <a href="#" class="text-underline weight-700 font-title"> + Agregar Usuario</a>
      </v-col>
    </v-row>
    <v-tabs v-model="tabs" class="mt-5">
      <v-tab href="#tab-1"> Activos </v-tab>
      <v-tab href="#tab-2"> Inactivos </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabs">
      <v-tab-item value="tab-1">
        <DataTable
          color="primary"
          :headers="headers"
          :items="values"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-1"
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
      </v-tab-item>
      <v-tab-item value="tab-2">
        <DataTable
          color="primary"
          :headers="headers"
          :items="values"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-1"
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
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import { constantRoutes } from '../../routes'
export default {
  name: 'Usuarios',
  data() {
    return {
      tabs: 'tab-1',
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
        },
        {
          name: 'Ice cream sandwich',
          rut: '23.266.206-8',
          access: ['Jefe de servicios'],
        },
        {
          name: 'Eclair',
          rut: '23.266.206-8',
          access: ['Jefe de servicios'],
        },
        {
          name: 'Cupcake',
          rut: '23.266.206-8',
          access: ['Operador'],
        },
        {
          name: 'Gingerbread',
          rut: '23.266.206-8',
          access: ['Oficina de partes', 'Jefe de servicios'],
        },
        {
          name: 'Jelly bean',
          rut: '23.266.206-8',
          access: ['Administrador'],
        },
        {
          name: 'Lollipop',
          rut: '23.266.206-8',
          access: ['Administrador', 'Jefe de servicios'],
        },
      ],
    }
  },
}
</script>
<style>
.v-select .v-input__slot {
  min-height: 48px !important;
}
</style>
