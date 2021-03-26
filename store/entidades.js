import { isValidResponse } from '~/shared/utils/request'
export const STRATEGY = 'claveUnica'
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
  async getEntities({ commit }) {
    let resp = null
    const params = {
      entidad: 0,
      isBloqueado: true,
      nombre: 'string',
      orderby: 'string',
      ordertype: 'ASC',
      page_number: 0,
      page_size: 0,
      roles: ['ROLE_ADMIN'],
      run: 0,
    }
    resp = await this.$auth.requestWith(STRATEGY, {
      method: 'GET',
      url: '/entidades/',
    })
    const [valid, Toast] = isValidResponse(resp)

    if (!valid) {
      Toast.error({
        message: 'Ha ocurrido un error',
      })
    } else {
      commit('setEntitiesList', resp.result)
    }
  },
  async insertEntity({ commit }, entity) {
    let resp = null
    const body_ = entity
    resp = await this.$auth.requestWith(STRATEGY, {
      method: 'POST',
      url: '/entidades/',
      data: body_,
    })
    return resp
  },
  async getEntity({ commit }, id) {
    let resp = null
    resp = await this.$auth.requestWith(STRATEGY, {
      method: 'GET',
      url: '/entidades/' + id,
    })
    return resp
  },

  async updateEntity({ commit }, entity) {
    let resp = null
    const body_ = entity
    resp = await this.$auth.requestWith(STRATEGY, {
      method: 'PUT',
      url: '/entidades/',
      data: body_,
    })
    return resp
  },

  async getRegions({ commit }) {
    const resp = await this.$auth.requestWith(STRATEGY, {
      method: 'GET',
      url: '/tipos/distgeografica/regiones/',
    })

    const [valid, Toast] = isValidResponse(resp)

    if (!valid) {
      Toast.error({
        message: 'Ha ocurrido un error obteniendo las regiones',
      })
    } else {
      commit('setRegionList', resp.result)
    }
  },

  async getProvincias({ commit }, region) {
    const resp = await this.$auth.requestWith(STRATEGY, {
      method: 'GET',
      url: '/tipos/distgeografica/regiones/' + region + '/provincias',
    })

    const [valid, Toast] = isValidResponse(resp)

    if (!valid) {
      Toast.error({
        message: 'Ha ocurrido un error obteniendo las provincias',
      })
    } else {
      return resp.result.map(({ id, nombre }) => {
        return { id, name: nombre }
      })
    }

    return null
  },

  async getComunas({ commit }, provincia) {
    const resp = await this.$auth.requestWith(STRATEGY, {
      method: 'GET',
      url: '/tipos/distgeografica/regiones/provincias/' + provincia + '/comunas',
    })

    const [valid, Toast] = isValidResponse(resp)

    if (!valid) {
      Toast.error({
        message: 'Ha ocurrido un error obteniendo las comunas',
      })
    } else {
      return resp.result.map(({ id, nombre }) => {
        return { id, name: nombre }
      })
    }

    return null
  },
  async deleteEntity({ commit }, id) {
    let resp = null

    resp = await this.$auth.requestWith(STRATEGY, {
      method: 'DELETE',
      url: '/entidades/' + id,
    })
    const [valid, Toast] = isValidResponse(resp)
    if (!valid) {
      Toast.error({
        message: 'Ha ocurrido un error',
      })
    } else {
      Toast.success({
        message: 'Entidad eliminada',
      })
      commit('deleteEntity', id)
    }
    return resp
  },
}
