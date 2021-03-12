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
  // getUser({ commit }, state, id ){
  //   userIndex = state.users.findIndex((obj => obj.userid == id));
  //   return state.users[userIndex] 
  // }

}
