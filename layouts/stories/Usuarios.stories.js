// import { storyPath } from './_settings'
// import { constantRoutes } from '../../routes'
//
// export default {
//   title: storyPath,
//   argTypes: {},
// }
//
// const Template = (args, { argTypes }) => ({
//   props: Object.keys(argTypes),
//   data() {
//     return {
//       tabs: 'tab-1',
//       options: ['10', '20', '30'],
//       breadcrums: [
//         {
//           text: 'Administración',
//           disabled: false,
//           href: 'breadcrumbs_dashboard',
//         },
//         {
//           text: 'Usuarios',
//           disabled: true,
//           href: 'breadcrumbs_link_2',
//         },
//       ],
//       drawer: true,
//       items: constantRoutes,
//       right: null,
//       open: [1, 2],
//       tree: null,
//       caseSensitive: false,
//       page: 1,
//       pageCount: 3,
//       itemsPerPage: 10,
//       headers: [
//         {
//           text: 'Nombre',
//           align: 'start',
//           sortable: true,
//           value: 'name',
//           filterable: true,
//         },
//         { text: 'Rut', value: 'rut', filterable: true },
//         { text: 'Permisos', value: 'access', sortable: true },
//         { text: 'Acciones', value: 'actions', sortable: false },
//       ],
//       values: [
//         {
//           name: 'Frozen Yogurt',
//           rut: '23.266.206-8',
//           access: ['Administrador', 'Jefe de servicios'],
//         },
//         {
//           name: 'Ice cream sandwich',
//           rut: '23.266.206-8',
//           access: ['Jefe de servicios'],
//         },
//         {
//           name: 'Eclair',
//           rut: '23.266.206-8',
//           access: ['Jefe de servicios'],
//         },
//         {
//           name: 'Cupcake',
//           rut: '23.266.206-8',
//           access: ['Operador'],
//         },
//         {
//           name: 'Gingerbread',
//           rut: '23.266.206-8',
//           access: ['Oficina de partes', 'Jefe de servicios'],
//         },
//         {
//           name: 'Jelly bean',
//           rut: '23.266.206-8',
//           access: ['Administrador'],
//         },
//         {
//           name: 'Lollipop',
//           rut: '23.266.206-8',
//           access: ['Administrador', 'Jefe de servicios'],
//         },
//         {
//           name: 'Honeycomb',
//           rut: '23.266.206-8',
//           access: ['Administrador', 'Jefe de servicios'],
//         },
//         {
//           name: 'Donut',
//           rut: '23.266.206-8',
//           access: ['Administrador', 'Jefe de servicios'],
//         },
//         {
//           name: 'KitKat',
//           rut: '23.266.206-8',
//           access: ['Operador', 'Jefe de servicios'],
//         },
//       ],
//     }
//   },
//   //html
//   template: `
//     <dx-layout>
//
// <!-- HEADER -->
//
//       <template v-slot:header>
//         <Header />
//       </template>
//
// <!-- NAVIGATION -->
//
//       <template v-slot:nav>
//         <Navigation
//           color="#093F75"
//           width="325"
//           v-model="drawer"
//           :mini-variant.sync="mini"
//           permanent >
//           <v-list-item class="px-3">
//
//             <v-list-item-icon>
//               <v-icon large class="light--text"> mdi-account </v-icon>
//             </v-list-item-icon>
//
//             <v-list-item-title class="light--text">Entidad Seleccionada</v-list-item-title>
//
//             <v-btn
//                 icon
//                 @click.stop="mini = !mini"
//             >
//               <v-icon class="light--text">mdi-chevron-left</v-icon>
//             </v-btn>
//           </v-list-item>
//
//           <v-divider></v-divider>
//           <div class="py-4" style="display: flex; justify-content: center;">
//             <v-button large color="primary" outlined v-bind="$props" class="light">
//               <dx-icon left regular>
//                 mdi-send
//               </dx-icon>
//               <span class="text-underline"> Enviar Documento </span>
//             </v-button>
//           </div>
//
//           <v-list dense>
//             <v-list-item
//                 v-for="item in items"
//                 :key="item.title"
//                 active-class="light--text"
//                 link
//             >
//               <v-list-item-icon>
//                 <v-icon class="light--text">{{ item.icon }}</v-icon>
//               </v-list-item-icon>
//
//               <v-list-item-content>
//                 <v-list-item-title class="light--text">{{ item.title }}</v-list-item-title>
//               </v-list-item-content>
//             </v-list-item>
//           </v-list>
//
//           <v-list dark>
//             <v-list-item>
//               <v-list-item-icon>
//                 <v-icon>mdi-home</v-icon>
//               </v-list-item-icon>
//
//               <v-list-item-title>Home</v-list-item-title>
//             </v-list-item>
//
//             <v-list-group
//                 :value="true"
//                 active-class="light--text"
//                 prepend-icon="mdi-account-circle"
//             >
//               <template v-slot:activator>
//                 <v-list-item-title>Users</v-list-item-title>
//               </template>
//
//               <v-list-group
//                   :value="true"
//                   active-class="light--text"
//                   no-action
//               >
//                 <template v-slot:activator>
//                   <v-list-item-content>
//                     <v-list-item-title>Admin</v-list-item-title>
//                   </v-list-item-content>
//                 </template>
//
//                 <v-list-item
//                     v-for="([title, icon], i) in admins"
//                     :key="i"
//                     link
//                 >
//                   <v-list-item-title v-text="title"></v-list-item-title>
//
//                   <v-list-item-icon>
//                     <v-icon v-text="icon"></v-icon>
//                   </v-list-item-icon>
//                 </v-list-item>
//               </v-list-group>
//               <v-list-group
//                   no-action
//                   sub-group
//               >
//                 <template v-slot:activator>
//                   <v-list-item-content>
//                     <v-list-item-title>Actions</v-list-item-title>
//                   </v-list-item-content>
//                 </template>
//
//                 <v-list-item
//                     v-for="([title, icon], i) in cruds"
//                     :key="i"
//                     link
//                 >
//                   <v-list-item-title v-text="title"></v-list-item-title>
//
//                   <v-list-item-icon>
//                     <v-icon v-text="icon"></v-icon>
//                   </v-list-item-icon>
//                 </v-list-item>
//               </v-list-group>
//             </v-list-group>
//           </v-list>
//         </Navigation>
//       </template>
//
// <!-- MAIN -->
//
//       <template v-slot:main>
//         <v-container class="px-10">
//           <dx-breadcrumbs :items="breadcrums" />
//           <dx-icons-actions class="text-right"/>
//           <span class="weight-700 text-md-h4">Usuarios</span>
//           <div class="mt-10 weight-400">
//             <span class="mr-2">Mostrando hasta</span>
//             <v-select
//               class="d-inline-flex min-content"
//               style="width: 104px"
//               :items="options"
//               label="Selección Simple"
//               value="10"
//               solo
//               flat
//               outlined
//               v-bind="$props"
//               ripple="false"
//               single-line
//             ></v-select>
//             <span class="ml-3">resultados de un total de <b>17 usuarios</b></span>
//           </div>
//
//           <v-row>
//             <v-col sm="6">
//               <dx-button class="line-height-24 weight-700 mr-4" outlined>
//                 <span class="text-underline"> Filtra tu búsqueda </span>
//                 <v-icon small> mdi-filter </v-icon>
//               </dx-button>
//             </v-col>
//             <v-col sm="6" class="text-right">
//               <a href="#" class="text-underline"> + Agregar Usuario</a>
//             </v-col>
//           </v-row>
//
//           <v-tabs class="mt-5" v-model="tabs">
//             <v-tab href="#tab-1"> Activos </v-tab>
//             <v-tab href="#tab-2"> Inactivos </v-tab>
//           </v-tabs>
//
//           <v-tabs-items v-model="tabs">
//             <v-tab-item value="tab-1" >
//               <v-card flat>
//                 <DataTable
//                     color="primary"
//                     :headers="headers"
//                     :items="values"
//                     :page.sync="page"
//                     :items-per-page="itemsPerPage"
//                     hide-default-footer
//                     class="elevation-1"
//                     show-select
//                     @page-count="pageCount = $event"
//                   >
//                     <template v-slot:item.data-table-select="{ isSelected, select }">
//                       <v-simple-checkbox color="primary" :value="isSelected" @input="select($event)" />
//                     </template>
//
//                     <template v-slot:item.data-table-select="{ isSelected, select }">
//                       <v-simple-checkbox color="green" dense :value="isSelected" @input="select($event)" />
//                     </template>
//
//                     <template v-slot:item.access="{ item: { access } }">
//                       <v-chip v-for="v in access" :key="v" class="ml-2" color="primary" small>
//                         {{ v }}
//                       </v-chip>
//                     </template>
//
//                     <template v-slot:item.actions>
//                       <v-icon dense class="mr-2"> mdi-square-edit-outline </v-icon>
//                       <v-icon dense class="mr-2"> mdi-eye </v-icon>
//                       <v-icon dense> mdi-delete </v-icon>
//                     </template>
//                   </DataTable>
//                   <div class="pt-2 mr-6">
//                     <dx-pagination v-model="page" :length="pageCount" class="float-right" />
//                   </div>
//               </v-card>
//             </v-tab-item>
//
//             <v-tab-item value="tab-2" >
//               <v-card flat>
//                 <v-card-text>Contenido Inactivos</v-card-text>
//               </v-card>
//             </v-tab-item>
//           </v-tabs-items>
//
//         </v-container>
//       </template>
//
// <!-- FOOTER -->
//
//       <template v-slot:footer>
//         <DxFooter color="white" />
//       </template>
//     </dx-layout>
//   `,
// })
//
// export const Usuarios = Template.bind({})
// Usuarios.args = {}
