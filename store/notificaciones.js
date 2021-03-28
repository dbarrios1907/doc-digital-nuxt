import { isValidResponse } from '~/shared/utils/request'
import endpoints from '~/api/endpoints'

export const state = () => ({
  count: 0,
  notificaciones: [
    {
        id: 1,
        nombre: 'Nombre Nombre Apellido Apellido',
        asunto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        id: 2,
        nombre: 'Nombre Nombre Apellido Apellido',
        asunto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        id: 3,
        nombre: 'Nombre Nombre Apellido Apellido',
        asunto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        id: 4,
        nombre: 'Nombre Nombre Apellido Apellido',
        asunto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        id: 5,
        nombre: 'Nombre Nombre Apellido Apellido',
        asunto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        id: 6,
        nombre: 'Nombre Nombre Apellido Apellido',
        asunto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    }
  ],
})

export const getters = {
  getNotificaciones(state) {
    return state.notificaciones
  },
}

export const mutations = {
  
}

export const actions = {
  
}
