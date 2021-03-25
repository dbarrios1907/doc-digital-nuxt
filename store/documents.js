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
  deleteDocument: (state, id) => {
    const documents = state.documents.filter(function (doc) {
      return doc.id != id
    })
    state.documents = documents
  },
}

export const actions = {
  async getDocuments({ commit, rootState }, inbox) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, {
      method: 'GET',
      url: '/documentos/tareas/' + inbox,
    })
    const [valid] = isValidResponse(resp)
    if (valid) {
      commit(
        'setDocuments',
        resp.result.map(({ documento }) => documento)
      )
    }
  },
  async getSteps({ commit, rootState }, id) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, {
      method: 'GET',
      url: '/documentos/' + id + '/tramitacion/etapas',
    })
    const [valid] = isValidResponse(resp)
    if (valid) {
      return resp.result
    }
  },
  async loadDocumentTask({ commit, rootState }, { tipoTarea, usuario }) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, {
      method: 'GET',
      url: '/documentos/tareas',
      params: { tipoEtapa: tipoTarea, usuario },
    })
    const [valid] = isValidResponse(resp)
    if (valid) {
      console.log(resp.result)
    }
  },
  async getDocument({ commit, rootState }, id) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, {
      method: 'GET',
      url: '/documentos/' + id,
    })
    const [valid] = isValidResponse(resp)
    if (!valid) {
      return resp.result
    }
    return null
  },
  async getTramitacion({ commit, rootState }, id) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, {
      method: 'GET',
      url: '/documentos/' + id + '/tareas',
    })
    const [valid] = isValidResponse(resp)
    if (valid) {
      return resp.result
    }
  },
  async deleteDocument({ commit, rootState }, id) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, {
      method: 'DELETE',
      url: '/documentos/' + id,
    })
    const [valid, Toast] = isValidResponse(resp)
    if (valid) {
      commit('deleteDocument', id)
      Toast.success({
        message: 'Documento eliminado',
      })
      return true
    }

    return false
  },
}
