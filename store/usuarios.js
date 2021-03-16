import { isValidResponse } from '~/shared/utils/request'
export const STRATEGY = "claveUnica"
export const state = () => ({  
  users: [
    {
      userid: 1,
      name: 'Nombre Nombre Apellido Apellido',
      rut: '23.266.206-8',
      access: ['Administrador', 'Jefe de servicio'],
      status: 'active',
    },
    {
      userid: 2,
      name: 'Nombre2 Nombre Apellido Apellido',
      rut: '21.266.206-8',
      access: ['Administrador'],
      status: 'active',
    },
    {
      userid: 3,
      name: 'Nombre3 Nombre Apellido Apellido',
      rut: '21.256.206-8',
      access: ['Jefe de servicio'],
      status: 'active',
    },
    {
      userid: 4,
      name: 'Nombre4 Nombre Apellido Apellido',
      rut: '20.266.206-8',
      access: ['Operador'],
      status: 'active',
    },
    {
      userid: 5,
      name: 'Nombre5 Nombre Apellido Apellido',
      rut: '20.200.206-8',
      access: ['Jefe de servicio'],
      status: 'active',
    },
    {
      userid: 6,
      name: 'Nombre6 Nombre Apellido Apellido',
      rut: '24.266.206-8',
      access: ['Oficina de partes'],
      status: 'inactive',
    },
    {
      userid: 7,
      name: 'Nombre7 Nombre Apellido Apellido',
      rut: '25.266.206-8',
      access: ['Administrador'],
      status: 'inactive',
    },
    {
      userid: 8,
      name: 'Nombre8 Nombre Apellido Apellido',
      rut: '25.366.206-8',
      access: ['Operador'],
      status: 'inactive',
    },
    {
      userid: 9,
      name: 'Nombre9 Nombre Apellido Apellido',
      rut: '26.266.206-8',
      access: ['Operador'],
      status: 'inactive',
    },
    {
      userid: 10,
      name: 'Nombre10 Nombre Apellido Apellido',
      rut: '27.266.206-8',
      access: ['Oficina de partes'],
      status: 'inactive',
    },
  ],
})

export const getters = {
    getActivos(state){
      return state.users.filter(function(user) {
        return user.status === 'active';
      });
    },
    getInctivos(state){
      return state.users.filter(function(user) {
        return user.status === 'inactive';
      });
    }, 
    
}

export const mutations = {
  update: (state, id, newuser) => {
      userIndex = state.users.findIndex((obj => obj.userid == id));
      state.users[userIndex] = newuser        
  },
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
      nombre: "string",
      orderby: "string",
      ordertype: "ASC",
      page_number: 0,
      page_size: 0,
      roles: [
       "ROLE_ADMIN"
      ],
      run: 0
    }
    try {
      const resp = await this.$auth.requestWith('claveUnica', {
        method: 'GET',
        url: '/usuarios/1',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJNYXJpYSBDYXJtZW4gRGUgbG9zIGFuZ2VsZXMgRGVsIHJpbyBHb256YWxleiIsImN0eCI6eyJrZXkiOjMsInJ1biI6ODg4ODg4ODgsIm5vbWJyZSI6Ik1hcmlhIENhcm1lbiBEZSBsb3MgYW5nZWxlcyBEZWwgcmlvIEdvbnphbGV6IiwiY2FyZ28iOiJEZXZPcHMiLCJlbnRpZGFkSWQiOjEsImVudGlkYWROb21icmUiOiJFbnRpZGFkIFRlc3QgS0UiLCJjb250ZXh0VHlwZSI6IkNUWF9VU0VSIn0sImlkIjozLCJjdHhfdHlwZSI6InVzciIsImV4cCI6MTYxNTg1MzE0OSwiaWF0IjoxNjE1ODQ5NTQ5LCJhdXRob3JpdGllcyI6WyJST0xFX1VTVUFSSU8iXX0.uDrrV17eoL2bo0rETsGjELmFDYCsNnpQim4pKct-tcko1tigFbaLT_P94-52QUxDAqncKxSWiYUl1Ze2odVdyQ',
        },
        // params: params,
        // data: body_,
      })
    } catch (err) {console.log("Error: " + err)}
  },

  async getUser({ commit }, id){
    let resp = null
    try {
      resp = this.$auth.requestWith('claveUnica', {
        method: 'GET',
        url: '/usuarios/'+id,
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJNYXJpYSBDYXJtZW4gRGUgbG9zIGFuZ2VsZXMgRGVsIHJpbyBHb256YWxleiIsImN0eCI6eyJrZXkiOjMsInJ1biI6ODg4ODg4ODgsIm5vbWJyZSI6Ik1hcmlhIENhcm1lbiBEZSBsb3MgYW5nZWxlcyBEZWwgcmlvIEdvbnphbGV6IiwiY2FyZ28iOiJEZXZPcHMiLCJlbnRpZGFkSWQiOjEsImVudGlkYWROb21icmUiOiJFbnRpZGFkIFRlc3QgS0UiLCJjb250ZXh0VHlwZSI6IkNUWF9VU0VSIn0sImlkIjozLCJjdHhfdHlwZSI6InVzciIsImV4cCI6MTYxNTg2Mjc4NSwiaWF0IjoxNjE1ODU5MTg1LCJhdXRob3JpdGllcyI6WyJST0xFX1VTVUFSSU8iXX0.prz63oOEbvY2XqEboZ3ibT17P50dZPEZ0GS_7b6D7q_Iu3cdZK9ZgtL9lHjdqKJJB49ZRan-kwPo9f357UZXQg',
        },
        // params: params,
        // data: body_,
      })
    } catch (err) {}

    return resp
    
  }

}
