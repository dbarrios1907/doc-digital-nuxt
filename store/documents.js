export const STRATEGY = 'claveUnica'
import { isValidResponse } from '~/shared/utils/request'

export const state = () => ({
  documents: [],
  selectedDocument: null,
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
    const resp = await this.$auth.requestWith('claveUnica', {
      method: 'GET',
      url: '/documentos/tareas',
    })
    const [valid, Toast] = isValidResponse(resp)
    if (!valid) {
      console.error(resp)
      return false
      // Toast.error({
      //   message: 'Ha ocurrido un error',
      // })
    }
    commit(
      'setDocuments',
      resp.result.map(({ documento }) => documento)
    )
  },
  async loadDocumentTask({ commit }, { tipoTarea, usuario }) {
    try {
      const resp = await this.$auth.requestWith('claveUnica', {
        method: 'GET',
        url: '/documentos/tareas',
        params: { tipoEtapa: tipoTarea, usuario },
      })
      const [valid, Toast] = isValidResponse(resp)
      if (!valid) {
        Toast.error({
          message: 'Ha ocurrido un error',
        })
      } else {
        console.log(resp.result)
      }
    } catch (err) {
      console.log('Error: ' + err)
    }
  },
  async getDocument({ commit }, id) {
    const resp = await this.$auth.requestWith('claveUnica', {
      method: 'GET',
      url: '/documentos/' + id,
    })
    const [valid, Toast] = isValidResponse(resp)

    return resp.result
  },
}
