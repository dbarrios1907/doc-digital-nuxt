export const state = () => ({
  routes: [
    {
      path: '/documentos',
      redirect: 'noRedirect',
      name: 'Documentos',
      meta: {
        title: 'Documentos',
        icon: 'mdi-file-multiple',
      },
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
      path: '/administracion',
      name: 'administracion',
      redirect: 'noRedirect',
      meta: {
        title: 'Administración',
        icon: 'mdi-cog',
      },
      children: [
        {
          path: 'usuarios',
          name: 'usuarios',
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
  ],
  authStrategy: 'claveUnica',
  selectedEntity: null,
})

export const mutations = {
  setSelectedEntity: (state, entity) => {
    state.selectedEntity = entity
  },
}

export const actions = {
  setSelectedEntity({ commit }, entity) {
    commit('update', entity)
  },
}
