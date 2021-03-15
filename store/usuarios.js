export const STRATEGY = "claveUnica"
export const state = () => ({  
    users: [],     
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
      resp = await this.$auth.requestWith('claveUnica', {
        method: 'GET',
        url: '/usuarios/1',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJNYXJpYSBDYXJtZW4gRGUgbG9zIGFuZ2VsZXMgRGVsIHJpbyBHb256YWxleiIsImN0eCI6eyJrZXkiOjMsInJ1biI6ODg4ODg4ODgsIm5vbWJyZSI6Ik1hcmlhIENhcm1lbiBEZSBsb3MgYW5nZWxlcyBEZWwgcmlvIEdvbnphbGV6IiwiY2FyZ28iOiJEZXZPcHMiLCJlbnRpZGFkSWQiOjEsImVudGlkYWROb21icmUiOiJFbnRpZGFkIFRlc3QgS0UiLCJjb250ZXh0VHlwZSI6IkNUWF9VU0VSIn0sImlkIjozLCJjdHhfdHlwZSI6InVzciIsImV4cCI6MTYxNTg1MzE0OSwiaWF0IjoxNjE1ODQ5NTQ5LCJhdXRob3JpdGllcyI6WyJST0xFX1VTVUFSSU8iXX0.uDrrV17eoL2bo0rETsGjELmFDYCsNnpQim4pKct-tcko1tigFbaLT_P94-52QUxDAqncKxSWiYUl1Ze2odVdyQ',
        },
        // params: params,
        // data: body_,
      })
      console.log(resp);
    } catch (err) {console.log("Error: " + err)}
  }

}
