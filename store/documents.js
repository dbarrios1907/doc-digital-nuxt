export const STRATEGY = 'claveUnica'
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
  async getDocuments({ commit }) {
    try {
      let resp = await this.$auth.requestWith('claveUnica', {
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
  async loadDocumentTask({commit}, {tipoTarea, usuario}){
    try {
      let resp = await this.$auth.requestWith('claveUnica', {
        method: 'GET',
        url: '/documentos/tareas',
        params:{tipoEtapa: tipoTarea, usuario}
      })
      const [valid, Toast] = isValidResponse(resp)
      if (!valid) {
        Toast.error({
          message: 'Ha ocurrido un error',
        })
      } else {
        console.log(resp.result)

        // commit(
        //   'setDocuments',
        //   resp.result.map(({ documento }) => documento)
        // )
      }
    } catch (err) {
      console.log('Error: ' + err)
    }
  }
}
