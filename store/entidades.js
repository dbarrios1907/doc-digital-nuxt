import { isValidResponse } from '~/shared/utils/request'
import endpoints from '~/api/endpoints'

export const state = () => ({
  selectedEntity: null,
  count: 0,
  entities: [],
  regions: [],
  provinces: [],
  comunas: [],
})

export const getters = {
  getEntities(state) {
    return state.entities
  },
  getRegions(state) {
    return state.regions
  },
  getProvinces: state => regionid => {
    return state.provinces.filter(prov => prov.region.id === regionid)
  },
  getComunas: state => provid => {
    return state.comunas.filter(com => com.provincia.id === provid)
  },
}

export const mutations = {
  update: (state, id, newEntity) => {
    const entIndex = state.entities.findIndex(obj => obj.id == id)
    state.entities[entIndex] = newEntity
  },
  setEntitiesList: (state, entitiesList) => {
    state.entities = entitiesList
  },
  setRegionList: (state, regionList) => {
    state.regions = regionList.map(({ id, nombre }) => {
      return { id, name: nombre }
    })
  },
  deleteEntity: (state, id) => {
    const entities = state.entities.filter(function (entity) {
      return entity.id != id
    })
    state.entities = entities
  },
}

export const actions = {
  async getEntities({ commit, rootState }, params = {}) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.entitiesFetchAll(params))
    const [valid] = isValidResponse(resp)
    if (valid) {
      commit('setEntitiesList', resp.result)
    }
  },

  async fetchUserEntities({ rootState }, params = {}) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.entitiesFetchAll(params))
    const [valid] = isValidResponse(resp)
    if (valid) {
      return resp.result
    }
    return false
  },

  async insertEntity({ rootState }, params) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.entitiesCreate(params))
    const [valid, Toast] = isValidResponse(resp)
    if (valid) {
      Toast.success({
        message: 'Entidad insertada',
      })
      return resp.result
    } else {
      Toast.error({
        message: 'Ha ocurrido un error insertando la entidad',
      })
      return false
    }
  },
  async getEntity({ rootState }, id) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.entitiesFetch(id))
    const [valid, Toast] = isValidResponse(resp)
    if (valid) {
      return resp.result
    } else {
      Toast.error({
        message: 'Ha ocurrido un error',
      })
      return false
    }
  },

  async updateEntity({ rootState }, params) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.entitiesUpdate(params))
    const [valid, Toast] = isValidResponse(resp)
    if (valid) {
      Toast.success({
        message: 'Entidad actualizada',
      })
      return resp.result
    } else {
      Toast.error({
        message: 'Ha ocurrido un error actualizando la entidad',
      })
      return false
    }
  },

  async getRegions({ commit, rootState }) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.regions)
    const [valid] = isValidResponse(resp)
    if (valid) {
      commit('setRegionList', resp.result)
    }
  },

  async getProvincias({ rootState }, region) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.provinces(region))
    const [valid] = isValidResponse(resp)
    if (valid) {
      return resp.result.map(({ id, nombre }) => {
        return { id, name: nombre }
      })
    }
    return null
  },

  async getComunas({ rootState }, provincia) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.comunas(provincia))
    const [valid] = isValidResponse(resp)
    if (valid) {
      return resp.result.map(({ id, nombre }) => {
        return { id, name: nombre }
      })
    }
    return null
  },
  async deleteEntity({ commit, rootState }, id) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.entitiesDelete(id))
    const [valid, Toast] = isValidResponse(resp)
    if (valid) {
      Toast.success({
        message: 'Entidad eliminada',
      })
      commit('deleteEntity', id)
    } else {
      Toast.error({
        message: 'Ha ocurrido un error eliminando la entidad',
      })
    }
  },
}
