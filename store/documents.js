import { isValidResponse } from '~/shared/utils/request'
export const state = () => ({
  documents: [],
})

export const getters = {
  getDocs(state) {
    return state.documents
  },
}

export const mutations = {
  setDocuments: (state, docs) => {
    state.documents = docs
  },
}

export const actions = {
  async getDocuments({ commit, rootState }) {
    try {
      const resp = await this.$auth.requestWith(rootState.authStrategy, {
        method: 'GET',
        url: '/documentos/tareas',
      })
      const [valid, Toast] = isValidResponse(resp)
      if (!valid) {
        Toast.error({
          message: 'Ha ocurrido un error',
        })
      } else {
        commit(
          'setDocuments',
          resp.result.map(({ documento }) => documento)
        )
      }
    } catch (err) {
      console.log('Error: ' + err)
    }
  },
}
