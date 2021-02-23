// import { storyPath } from './_settings'
// import { Navigation, Dashboard, Bodytitle } from '../components'
// import MainLayout from '../MainLayout'
// import { constantRoutes } from '../../routes'
//
// export default {
//   title: storyPath,
//   argTypes: {},
// }
//
// const Template = (args, { argTypes }) => ({
//   props: Object.keys(argTypes),
//   components: {
//     Navigation,
//     Dashboard,
//     MainLayout,
//   },
//   data() {
//     return {
//       drawer: true,
//       routes: constantRoutes,
//     }
//   },
//   template: `
//     <MainLayout>
//       <template v-slot:header>
//         <Header />
//       </template>
//
//       <template v-slot:nav>
//         <Navigation v-model="drawer" :routes="routes"/>
//       </template>
//
//       <template v-slot:main>
//         <v-container class="px-10 pr-8">
//           <Bodytitle title="Estás en el Módulo de Administración" subtitle="Aquí podrás crear o modificar usuarios y revisar los documentos que se tramitan en tu Institución."></Bodytitle>
//           <v-container class="px-0 mt-15">
//             <Dashboard />
//           </v-container>
//         </v-container>
//       </template>
//       <template v-slot:footer>
//         <DxFooter color="white" />
//       </template>
//     </MainLayout>
//   `,
// })
//
// export const DashboardSample = Template.bind({})
// DashboardSample.args = {}
