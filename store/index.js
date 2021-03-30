import get from 'lodash.get'
import endpoints from '~/api/endpoints'
import { isValidResponse } from '~/shared/utils/request'
const routes = () => [
  {
    path: '/documentos',
    redirect: 'noRedirect',
    name: 'Documentos',
    meta: {
      title: 'Documentos',
      icon: 'mdi-file-multiple',
    },
    roles: ['ROLE_USUARIO'],
    children: [
      {
        path: 'bandeja-visar',
        name: 'bandeja-visar',
        meta: { title: 'Visar', icon: 'mdi-eye' },
      },
      {
        path: 'bandeja-firmar',
        name: 'bandeja-firmar',
        meta: { title: 'Firmar', icon: 'mdi-pencil' },
      },
      {
        path: 'bandeja-borradores',
        name: 'bandeja-borradores',
        hideTray: 'dashboard.pendientesBorrador',
        meta: { title: 'Editar Borradores', icon: 'mdi-file-multiple' },
      },
      {
        path: 'bandeja-devueltos',
        name: 'bandeja-devueltos',
        hideTray: 'dashboard.pendientesDevueltos',
        meta: { title: 'Revisar Devueltos', icon: 'mdi-clipboard-arrow-down' },
      },
      {
        path: 'bandeja-historial',
        name: 'bandeja-historial',
        meta: { title: 'Historial', icon: 'mdi-folder-outline' },
      },
    ],
  },
  {
    path: '/oficina-partes',
    redirect: 'noRedirect',
    name: 'oficina-partes',
    meta: {
      title: 'Oficina de Partes',
      icon: 'mdi-bank',
    },
    roles: ['ROLE_OFICINA_PARTES'],
    children: [
      {
        path: 'enviados',
        name: 'Enviados',
        meta: { title: 'Enviados', icon: 'mdi-send' },
      },
      {
        path: 'recibidos',
        name: 'Recibidos',
        meta: { title: 'Recibidos', icon: 'mdi-inbox-arrow-down' },
      },
      {
        path: 'firmados',
        name: 'firmados',
        meta: { title: 'Firmados', icon: 'mdi-pencil' },
      },
    ],
  },
  {
    path: '/administracion',
    name: 'administracion',
    redirect: 'noRedirect',
    meta: {
      title: 'Administración',
      icon: 'mdi-cog',
    },
    roles: ['ROLE_ADMIN', 'ROLE_JEFE_SERVICIO', 'ROLE_SUPERADMIN'],
    children: [
      {
        path: 'usuarios',
        name: 'usuarios',
        meta: { title: 'Usuarios', icon: 'mdi-account-supervisor-circle' },
      },
      {
        path: 'documentos',
        name: 'documentos-administracion',
        redirect: 'noRedirect',
        sumbenu: true,
        meta: { title: 'Documentos', icon: 'mdi-file-multiple' },
        children: [
          {
            path: 'enviados',
            name: 'Enviados',
            meta: { title: 'Enviados', icon: 'mdi-send' },
          },
          {
            path: 'recibidos',
            name: 'Recibidos',
            meta: { title: 'Recibidos', icon: 'mdi-inbox-arrow-down' },
          },
        ],
      },
      {
        path: 'entidades',
        name: 'Entidades',
        meta: { title: 'Entidades', icon: 'mdi-bank' },
      },
      {
        path: 'correos',
        name: 'correos',
        meta: { title: 'Correos de Notificación', icon: 'mdi-email' },
      },
    ],
  },
  {
    path: '/nuevo-documento',
    name: 'nuevo-documento',
    redirect: 'noRedirect',
    hidden: true,
    meta: {},
    children: [
      {
        path: 'firmar',
        name: 'firmar',
        meta: { title: 'Enviar a firma' },
      },
      {
        path: 'visar',
        name: 'visar',
        meta: { title: 'Enviar a visar' },
      },
    ],
  },
]

export const state = () => ({
  routes: routes(),
  authStrategy: 'claveUnica',
  selectedEntity: null,
  dashboard: {
    pendientesBorrador: 0,
    pendientesDevueltos: 0,
    pendientesFirmar: 0,
    pendientesOpEnviar: 0,
    pendientesOpRecibir: 0,
    pendientesVisar: 0,
  },
})

export const getters = {
  roles: state => get(state, 'auth.user.authorities', []),
  userName: state => get(state, 'auth.user.ctx.nombre', ''),
  userRun: state => get(state, 'auth.user.ctx.run]', ''),
  entityName: state => get(state, 'auth.user.ctx.entidadNombre', ''),
  userId: state => get(state, 'auth.user.id', ''),
  userIsMultiUser: state => get(state, 'auth.user.isMultiUser', ''),
  dashboard: state => state.dashboard,
}

export const mutations = {
  setSelectedEntity: (state, entity) => {
    state.selectedEntity = entity
  },

  updateDashboard(state, payload) {
    state.dashboard = {
      ...state.dashboard,
      ...payload,
    }
  },
}

export const actions = {
  setSelectedEntity({ commit }, entity) {
    commit('update', entity)
  },

  updateUserAccess({ commit, state }, userData) {},

  async fetchUserDashboard({ commit, rootState, getters }) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.fetchUserDashboard(getters.userId))
    const [valid] = isValidResponse(resp)
    if (valid) {
      commit('updateDashboard', resp?.result || {})
    }
  },
}
