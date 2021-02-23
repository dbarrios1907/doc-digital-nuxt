import Navigation from '../components/navigation/index'
import { storyPath } from './_settings'

export default {
  title: storyPath,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  components: {
    Navigation,
  },
  data() {
    return {
      drawer: true,
      routes: [
        {
          path: '/',
          redirect: '/dashboard',
          children: [
            {
              path: 'dashboard',
              name: 'dashboard',
              meta: { title: 'Dashboard', icon: 'dashboard' },
            },
          ],
        },
        {
          path: '/usuarios',
          children: [
            {
              path: 'index',
              name: 'Usuarios',
              meta: { title: 'Usuarios', icon: 'mdi-account-supervisor-circle', affix: true },
            },
          ],
        },

        {
          path: '/documentos',
          redirect: 'noRedirect',
          name: 'ComponentDemo',
          meta: {
            title: 'Documentos',
            icon: 'mdi-file-multiple',
          },
          children: [
            {
              path: 'enviados',

              name: 'Enviados',
              meta: { title: 'Enviados' },
            },
            {
              path: 'recibidos',

              name: 'Recibidos',
              meta: { title: 'Recibidos' },
            },
            {
              path: 'por-firmar',

              name: 'Por Firmar',
              meta: { title: 'Por Firmar' },
            },
          ],
        },

        {
          path: '/oficina-de-partes',
          redirect: 'noRedirect',
          name: 'root-oficina-partes',
          meta: {
            title: 'Documentos',
            icon: 'mdi-file-multiple',
          },
          children: [
            {
              path: 'enviados',
              name: 'Enviados',
              meta: { title: 'Enviados' },
            },
            {
              path: 'recibidos',
              name: 'Recibidos',
              meta: { title: 'Recibidos' },
            },
          ],
        },

        {
          path: '/administracion',
          redirect: 'noRedirect',
          name: 'ComponentDemo',
          meta: {
            title: 'Administración',
            icon: 'mdi-file-multiple',
          },
          children: [
            {
              path: 'usuarios',
              name: 'Usuarios',
              meta: { title: 'Usuarios', icon: 'mdi-account-supervisor-circle' },
            },
            {
              path: 'documentos',

              name: 'Documentos',
              meta: { title: 'Documentos', icon: 'mdi-file-multiple' },
            },
            {
              path: 'entidades',

              name: 'Entidades',
              meta: { title: 'Entidades', icon: 'mdi-file-multiple' },
            },
            {
              path: 'correos-de-notificacion',

              name: 'correos-de-notificacion',
              meta: { title: 'Correos de Notificación', icon: 'mdi-file-multiple' },
            },
          ],
        },
      ],
    }
  },
  template: `
    <Navigation :routes="routes"/>
  `,
})

export const NavigationSample = Template.bind({})
NavigationSample.args = {}
