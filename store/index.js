import get from 'lodash.get'
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
        meta: { title: 'Editar Borradores', icon: 'mdi-file-multiple' },
      },
      {
        path: 'bandeja-devueltos',
        name: 'bandeja-devueltos',
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
        name: 'Documentos',
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
          {
            path: 'por-firmar',
            name: 'por-firmar',
            meta: { title: 'Por firmar', icon: 'mdi-pencil' },
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
})

export const getters = {
  roles: state => get(state, 'auth.user.authorities', []),
  userName: state => get(state, 'auth.user.ctx.nombre', ''),
  entityName: state => get(state, 'auth.user.ctx.entidadNombre', ''),
}

export const mutations = {
  setSelectedEntity: (state, entity) => {
    state.selectedEntity = entity
  },

  updateUserAccess() {},
}

export const actions = {
  setSelectedEntity({ commit }, entity) {
    commit('update', entity)
  },

  updateUserAccess({ commit, state }, userData) {},
}
