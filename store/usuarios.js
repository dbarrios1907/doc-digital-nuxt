import { isValidResponse } from '~/shared/utils/request'
export const STRATEGY = "claveUnica"
export const state = () => ({  
  selectedUser: null,
  count: 0,
  users: [],
})

export const getters = {
    getActivos(state){
      return state.users.filter(function(user) {
        return !user.isBloqueado;
      })
    },
    getInctivos(state){
      return state.users.filter(function(user) {
        return user.isBloqueado;
      })
    }, 
    getByEntity: (state) => (entityid) => {
      return state.users.filter(user => {
        return user.entidad ? user.entidad.id === entityid : false
      })
    },

    
    getSelectedUser(state){
        return state.selectedUser
    }    
}

export const mutations = {
  update: (state, id, newuser) => {
    userIndex = state.users.findIndex(obj => obj.userid == id)
    state.users[userIndex] = newuser
  },
  setUserList: (state, listUsers, count) => {
    let users = [];
    for(let i = 0; i < listUsers.length; i++){
      users.push({
        id : listUsers[i].id,
        rut : listUsers[i].run + '-' + listUsers[i].dv,
        nombres : listUsers[i].nombreCompleto,
        apellidos : listUsers[i].apellidos,
        correoInstitucional : listUsers[i].correoInstitucional,
        cargo : listUsers[i].cargo,
        subrogante : listUsers[i].subrogante,
        roles:  listUsers[i].roles ? listUsers[i].roles.filter((rol) => {return rol != 'ROLE_USUARIO'}) : [],
        isBloqueado : listUsers[i].isBloqueado,
        isDelete : listUsers[i].isDelete,
        nombreCompleto : listUsers[i].nombreCompleto,
        entidad: listUsers[i].entidad
      })
    }
    state.users = users
    state.count = count     
  },
  setSelecterUser : (state, user) => {
    state.selectedUser = user
  }, 
  deleteUser : (state, id) => {
    let newUsers =  state.users.filter(function(user) { return user.id != id; });
    state.users = newUsers
  },
  setUserStatus : (state, {id, status}) => {
    try{
      let newUsers =  state.users;
      let objIndex = newUsers.findIndex((obj =>(obj.id == id))) 
      newUsers[objIndex].isBloqueado = status
      state.users = newUsers
    }
    catch(err){}
  }
}

export const actions = {
  updateUser({ commit }, id, newuser) {
    commit('update', id, newuser)
  },
  async getUsers({ commit }){
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
        url: '/usuarios/',
      })
      const [valid, Toast] = isValidResponse(resp)

      if (!valid) {
        Toast.error({
          message: 'Ha ocurrido un error',
        })
      }
      else{
        commit('setUserList', resp.result, resp.count)
      }
    } catch (err) {}   
    
  },

  async getUser({ commit }, id){
    let resp = null
    try {
      resp = await this.$auth.requestWith(STRATEGY, {
        method: 'GET',
        url: '/usuarios/'+id,
        // headers,
      })
      const [valid, Toast] = isValidResponse(resp)

      if (!valid) {
        Toast.error({
          message: 'Ha ocurrido un error',
        })
      }
      else{
        commit('setSelecterUser', resp.result)
      }
    } catch (err) {}
    return resp    
  },

  
  async insertUser({ commit }, user){
    let resp = null
    const body_ = {
      isSubroganteActivado: user.isSubroganteActivado,
      isBloqueado: user.isBloqueado,
      nombres: user.nombres,
      run: parseInt(user.run),
      dv: user.dv,
      apellidos: user.apellidos,
      correoInstitucional: user.correoInstitucional,
      cargo: user.cargo,
      entidad: user.entidad,
      roles: user.roles
      // subrogante : user.subrogante
    }    
    try {
      resp = await this.$auth.requestWith(STRATEGY, {
        method: 'POST',
        url: '/usuarios/',
        data: body_,
        // headers
      })
    } catch (err) {}

    return resp    
  },

  async deleteUser({ commit }, id){
    let resp = null
    try {
      resp = await this.$auth.requestWith(STRATEGY, {
        method: 'DELETE',
        url: '/usuarios/'+id,
        // headers, 
      })
    } catch (err) {}

    const [valid, Toast] = isValidResponse(resp)

    if (valid) {
      commit('deleteUser', id)
    }
    return  resp    
  },

  async updateUser({ commit }, user){
    let resp = null
    const body_ = {
      isSubroganteActivado: user.isSubroganteActivado,
      isBloqueado: user.isBloqueado,
      nombres: user.nombres,
      run: parseInt(user.run),
      dv: user.dv,
      apellidos: user.apellidos,
      correoInstitucional: user.correoInstitucional,
      cargo: user.cargo,
      entidad: user.entidad,
      roles: user.roles,
      id:parseInt(user.id),
      // seguidor : user.seguidor
      // subrogante : user.subrogante
    }    
    try {
      resp = await this.$auth.requestWith(STRATEGY, {
        method: 'PUT',
        url: '/usuarios/',
        data: body_
        // headers, 
      })
    } catch (err) {}
    return  resp    
  },
  
  async setUserStatus({ commit }, {id, status}){
    let resp = null
    try {
      resp = await this.$auth.requestWith(STRATEGY, {
        method: 'POST',
        url: '/usuarios/'+id+'/activar/'+status
        // headers, 
      })
    } catch (err) {}

    const [valid, Toast] = isValidResponse(resp)

    if (valid) {
      commit('setUserStatus', {id, status})
    }
    return  resp    
  },
}
