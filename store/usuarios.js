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
    const body_ = 
    JSON.stringify({
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
    })
    console.log(body_)
    try {
      resp = await this.$auth.requestWith('claveUnica', {
        method: 'GET',
        url: '/usuarios/',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        // body: body_,
        // data: body_,
      })
      console.log(resp);
    } catch (err) {console.log("Error: " + err)}
  }

}
