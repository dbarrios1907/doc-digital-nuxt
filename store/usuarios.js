import { isValidResponse } from '~/shared/utils/request'
import endpoints from '~/api/endpoints'
import settings from '~/shared/settings'

export const state = () => ({
  selectedUser: null,
  count: 0,
  users: [],
  roles: [],
  relatedUsers: [],
  cachedUsers: [],
  cachedUserQuery: '',
})

export const getters = {
  getActivos(state) {
    return state.users.filter(function (user) {
      return !user.isBloqueado
    })
  },
  getInctivos(state) {
    return state.users.filter(function (user) {
      return user.isBloqueado
    })
  },

  getUsers: state =>  { return state.users },

  getUserById: state => id => {
    const userIndex = state.users.findIndex(obj => obj.id == id)
    return state.users[userIndex]
  },

  getByEntity: state => entityid => {
    return state.users.filter(user => {
      return user.entidad ? user.entidad.id === entityid : false
    })
  },

  getSelectedUser(state) {
    return state.selectedUser
  },

  getRoles(state) {
    return state.roles.filter(rol => rol.id != 'ROLE_USUARIO')
  },

  getUsersCount: state => {
    return state.count
  }
}

export const mutations = {
  update: (state, id, newuser) => {
    const userIndex = state.users.findIndex(obj => obj.id == id)
    state.users[userIndex] = newuser
  },
  setUserList: (state, [listUsers, count]) => {
    let users = []
    for (let i = 0; i < listUsers.length; i++) {
      const user = listUsers[i]
      ;(user.rut = listUsers[i].run + '-' + listUsers[i].dv),
        (user.nombres = listUsers[i].nombres + ' ' + listUsers[i].apellidos),
        (user.roles = listUsers[i].roles
          ? listUsers[i].roles.filter(rol => {
              return rol != 'ROLE_USUARIO'
            })
          : []),
        users.push(user)
    }
    state.users = users
    state.count = count
  },
  setSelecterUser: (state, user) => {
    state.selectedUser = user
  },
  deleteUser: (state, id) => {
    const newUsers = state.users.filter(function (user) {
      return user.id != id
    })
    state.users = newUsers
  },
  setUserStatus: (state, { id, status }) => {
    try {
      const newUsers = state.users
      const objIndex = newUsers.findIndex(obj => obj.id == id)
      newUsers[objIndex].isBloqueado = status
      state.users = newUsers
      // eslint-disable-next-line no-empty
    } catch (err) {}
  },
  setUserRoles: (state, roles) => {
    state.roles = roles.map(({ valor, descripcion }) => {
      return {
        id: valor,
        name: descripcion,
      }
    })
  },
  setEntityUsers: (state, payload) => {
    state.relatedUsers = payload || []
  },

  setCachedUsers: (state, payload) => {
    state.cachedUsers = payload || []
  },

  setCachedUserQuery: (state, payload) => {
    state.cachedUserQuery = payload || []
  },

  cleanCached(state) {
    state.cachedUsers = []
    state.cachedUserQuery = ''
  },
}

export const actions = {
  async getUsers({ commit, rootState }, params = {}) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.usersFetchAll(params))
    const [valid] = isValidResponse(resp)
    if (valid) {
      commit('setUserList', [resp.result, resp.total_count])
    }
  },

  async fetchUsers({ commit, state, rootState, rootGetters }, params = {}) {
    if (state.cachedUsers.length > 0 && params.name === state.cachedUserQuery) return state.cachedUsers
    const data = {
      pageSize: settings.pageSize,
      ...params,
    }
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.usersFetchAll(data))
    const [valid] = isValidResponse(resp)
    if (valid) {
      const resData = resp.result
        .map(v => ({
          nombres: v.nombres + ' ' + v.apellidos,
          rut: `${v.run} - ${v.dv}`,
          id: v.id,
          name: v.nombreCompleto,
          position: v.cargo,
          email: v.correoInstitucional,
          entityName: v?.entidad?.nombre,
          entityId: v?.entidad?.id,
        }))
        .filter(v => v.id !== rootGetters.userId)
      commit('cachedUsers', resData)
      commit('cachedUserQuery', params.nombre)
      return resData
    }
    return []
  },

  async fetchRelatedUsers({ commit, state, rootState, rootGetters }, params = {}) {
    if (state.relatedUsers.length > 0) return state.relatedUsers

    const data = {
      run: rootGetters.userRun,
      ...params,
    }
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.usersFetchAll(data))
    const [valid] = isValidResponse(resp)
    if (valid) {
      const resData = resp.result.map(v => ({
        userId: v.id,
        entityName: v?.entidad?.nombre,
        entityId: v?.entidad?.id,
      }))
      commit('setEntityUsers', resData)
      return resData
    }
    return []
  },

  async getUser({ commit, rootState }, id) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.usersFetch(id))
    const [valid, Toast] = isValidResponse(resp)
    if (valid) {
      commit('setSelecterUser', resp.result)
      return resp.result
    } else {
      Toast.error({
        message: 'Ha ocurrido un error',
      })
      return false
    }
  },

  async insertUser({ rootState }, user) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.usersCreate(user))
    const [valid, Toast] = isValidResponse(resp)
    if (valid) {
      Toast.success({
        message: 'Usuario insertado',
      })
    } else {
      Toast.error({
        message: 'Ha ocurrido un error insertando el usuario',
      })
    }
  },

  async deleteUser({ commit, rootState }, id) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.usersDelete(id))
    const [valid, Toast] = isValidResponse(resp)
    if (valid) {
      Toast.success({
        message: 'Usuario eliminado',
      })
      commit('deleteUser', id)
      return true
    } else {
      Toast.error({
        message: 'Ha ocurrido un error eliminando el usuario',
      })
      return false
    }
  },

  async updateUser({ rootState }, user) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.usersUpdate(user))
    const [valid, Toast] = isValidResponse(resp)
    if (valid) {
      Toast.success({
        message: 'Usuario actualizado',
      })
      return resp.result
    } else {
      Toast.error({
        message: 'Ha ocurrido un error actualizando el usuario',
      })
      return false
    }
  },

  async setUserStatus({ commit, rootState }, { id, status }) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.usersStatus(id, status))
    const [valid, Toast] = isValidResponse(resp)
    if (valid) {
      Toast.success({
        message: status ? 'Usuario activado' : 'Usuario inactivado',
      })
      commit('setUserStatus', { id, status })
      return true
    } else {
      Toast.error({
        message: 'Ha ocurrido un error ' + status ? 'activando' : 'inactivando' + ' el usuario',
      })
      return false
    }
  },

  async getRoles({ commit, rootState }) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.roleOptions)
    const [valid] = isValidResponse(resp)
    if (valid) {
      commit('setUserRoles', resp.result)
    }
  },

  async hasSubrogados({ rootState }, id) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.usersSubrogados(id))
    const [valid, Toast] = isValidResponse(resp)
    if (valid) {
      if (resp.result.length > 0) {
        Toast.warning({
          message: `Al inactivar el usuario se desactivarán las funciones de Subrogancia y Seguimiento`,
        })
      }
    }
  },
  async setSubrogancia({ rootState }, { id, status }) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.usersSetSubrogancia(id, status))
    const [valid, Toast] = isValidResponse(resp)
    if (valid) {
      Toast.success({
        message: `Subrogancia ${status ? 'activada' : 'inactivada'}`,
      })
    }
  },

  async cleanCached({ commit }) {
    commit('cleanCached')
  },
}
