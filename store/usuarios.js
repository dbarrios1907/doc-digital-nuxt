import { isValidResponse } from '~/shared/utils/request'
export const STRATEGY = "claveUnica"
export const headers = {
  'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJNYXJpYSBDYXJtZW4gRGUgbG9zIGFuZ2VsZXMgRGVsIHJpbyBHb256YWxleiIsImN0eCI6eyJrZXkiOjMsInJ1biI6ODg4ODg4ODgsIm5vbWJyZSI6Ik1hcmlhIENhcm1lbiBEZSBsb3MgYW5nZWxlcyBEZWwgcmlvIEdvbnphbGV6IiwiY2FyZ28iOiJEZXZPcHMiLCJlbnRpZGFkSWQiOjEsImVudGlkYWROb21icmUiOiJFbnRpZGFkIFRlc3QgS0UiLCJjb250ZXh0VHlwZSI6IkNUWF9VU0VSIn0sImlkIjozLCJjdHhfdHlwZSI6InVzciIsImV4cCI6MTYxNTk5MzAwNCwiaWF0IjoxNjE1OTg5NDA0LCJhdXRob3JpdGllcyI6WyJST0xFX1VTVUFSSU8iLCJST0xFX09GSUNJTkFfUEFSVEVTIiwiUk9MRV9BRE1JTiJdfQ.nRHMM-34VZ5_jgWtUnleI9L4_Skncs-Qzw0jhOgCdGBbu2JQQg8edUeU1hyjs4nWTKOHCS1x_uNXlkc1ajUyaA'
}
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
        roles:  listUsers[i].roles,
        isBloqueado : listUsers[i].isBloqueado,
        isDelete : listUsers[i].isDelete,
        nombreCompleto : listUsers[i].nombreCompleto
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
        // headers,
        // params: params,
        // data: body_,
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
      resp = this.$auth.requestWith(STRATEGY, {
        method: 'GET',
        url: '/usuarios/'+id,
        // headers,
      })
    } catch (err) {}
    
    commit('setSelecterUser', resp.result)
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
      entidad: {},
      roles: user.roles
      // seguidor: user.seguidor[0],
      // subrogante: user.subrogante[0]
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
    console.log(resp)

    if (valid) {
      commit('deleteUser', id)
    }
    return  resp    
  },
}
