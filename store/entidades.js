import { isValidResponse } from '~/shared/utils/request'
export const STRATEGY = "claveUnica"
export const state = () => ({  
  selectedEntity: null,
  count: 0,
  entities: [],
  regions : [],
  provinces: [
    {
      id: 1,
      nombre: "provincia1",
      region: {
        id: 1,
        nombre: "region1",
      },
    },
    {
      id: 2,
      nombre: "provincia2",
      region: {
        id: 1,
        nombre: "region1",
      },
    },
    {
      id: 3,
      nombre: "provincia3",
      region: {
        id: 1,
        nombre: "region1",
      },
    },
    {
      id: 4,
      nombre: "provincia4",
      region: {
        id: 2,
        nombre: "region2",
      },
    },
    {
      id: 5,
      nombre: "provincia5",
      region: {
        id: 3,
        nombre: "region3",
      },
    }
  ],
  comunas: [
    {
      id: 1,
      nombre: "comuna1",
      provincia: {
        id: 1,
        nombre: "provincia1",
        region: {
          id: 1,
          nombre: "region1",
        },    
      }
    },
    {
      id: 2,
      nombre: "comuna2",
      provincia:{
        id: 2,
        nombre: "provincia2",
        region: {
          id: 1,
          nombre: "region1",
        },
      },
    },
    {
      id: 3,
      nombre: "comuna3",
      provincia: {
        id: 2,
        nombre: "provincia2",
        region: {
          id: 1,
          nombre: "region1",
        },
      },
    },
    {
      id: 3,
      nombre: "comuna3",
      provincia: {
        id: 1,
        nombre: "provincia1",
        region: {
          id: 1,
          nombre: "region1",
        },    
      }
    },
    {
      id: 4,
      nombre: "comuna4",
      provincia:{
        id: 5,
        nombre: "provincia5",
        region: {
          id: 3,
          nombre: "region3",
        },
      }
    }
  ],
})

export const getters = {
    getEntities(state){
      return state.entities
    }, 
    getRegions(state){
      return state.regions
    }, 
    getProvinces: (state) => (regionid) => {
      return state.provinces.filter(prov => prov.region.id === regionid)
    },
    getComunas: (state) => (provid) => {
      return state.comunas.filter(com => com.provincia.id === provid)
    },
}

export const mutations = {
    update: (state, id, newEntity) => {
      entIndex = state.entities.findIndex(obj => obj.id == id)
      state.entities[entIndex] = newEntity
    },
    setEntitiesList: (state, entitiesList) => {
        state.entities = entitiesList
    },
    setRegionList: (state, regionList) => {
      state.regions = regionList.map(({id, nombre}) => {
          return {id, name:nombre}
      })  
    }
  
}

export const actions = {
  async getEntities({ commit }){
    let resp = null
    const params = {
      entidad: 0,
      isBloqueado: true,
      nombre: 'string',
      orderby: 'string',
      ordertype: 'ASC',
      page_number: 0,
      page_size: 0,
      roles: [
       "ROLE_ADMIN"
      ],
      run: 0
    }
    try {
      resp = await this.$auth.requestWith(STRATEGY, {
        method: 'GET',
        url: '/entidades/',
      })
      const [valid, Toast] = isValidResponse(resp)

      if (!valid) {
        Toast.error({
          message: 'Ha ocurrido un error',
        })
      }
      else{
        commit('setEntitiesList', resp.result)
      }
    } catch (err) {}   
    
  },
  async insertEntity({ commit }, entity){
    let resp = null
    const body_ = entity   
    try {
      resp = await this.$auth.requestWith(STRATEGY, {
        method: 'POST',
        url: '/entidades/',
        data: body_,
      })
    } catch (err) {}
    return resp    
  },
  async getEntity({ commit }, id){
    let resp = null
    try {
      resp = await this.$auth.requestWith(STRATEGY, {
        method: 'GET',
        url: '/entidades/'+id,
      })     
    } catch (err) {}
    return resp    
  },
  
  async updateEntity({ commit }, entity){
    let resp = null
    const body_ = entity   
    try {
      resp = await this.$auth.requestWith(STRATEGY, {
        method: 'PUT',
        url: '/entidades/',
        data: body_,
      })
    } catch (err) {}
    return resp    
  },
  
  async getRegions({ commit }){
    try {
      let resp = await this.$auth.requestWith(STRATEGY, {
        method: 'GET',
        url: '/tipos/distgeografica/regiones/',
      })

      const [valid, Toast] = isValidResponse(resp)

      if (!valid) {
        Toast.error({
          message: 'Ha ocurrido un error obteniendo las regiones',
        })
      }
      else{
        commit('setRegionList', resp.result)
      }
    } catch (err) {console.log(err)}     
  },

  async getProvincias({ commit }, region){
    try {
      let resp = await this.$auth.requestWith(STRATEGY, {
        method: 'GET',
        url: '/tipos/distgeografica/regiones/'+region+'/provincias',
      })

      const [valid, Toast] = isValidResponse(resp)

      if (!valid) {
        Toast.error({
          message: 'Ha ocurrido un error obteniendo las provincias',
        })
      }
      else{
        return resp.result.map(({id, nombre}) => {
          return {id, name:nombre}
        })  
      }
    } catch (err) {console.log(err)} 
    return null    
  },  

  async getComunas({ commit }, provincia){
    try {
      let resp = await this.$auth.requestWith(STRATEGY, {
        method: 'GET',
        url: '/tipos/distgeografica/regiones/provincias/'+provincia+'/comunas',
      })

      const [valid, Toast] = isValidResponse(resp)

      if (!valid) {
        Toast.error({
          message: 'Ha ocurrido un error obteniendo las comunas',
        })
      }
      else{
        return resp.result.map(({id, nombre}) => {
          return {id, name:nombre}
        })  
      }
    } catch (err) {console.log(err)} 
    return null    
  },
  
}
