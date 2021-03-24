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
    let documents =  state.documents.filter(function(doc) { return doc.id != id; });
    state.documents = documents
  },
}

export const actions = {
  async getDocuments({ commit }, inbox) {
    try {
      let resp = await this.$auth.requestWith('claveUnica', {
        method: 'GET',
        url: '/documentos/tareas/' + inbox,
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
  async getSteps({ commit }, id) {
    try {
      let resp = await this.$auth.requestWith('claveUnica', {
        method: 'GET',
        url: '/documentos/' + id + '/tramitacion/etapas',
      })
      const [valid, Toast] = isValidResponse(resp)
      if (!valid) {
        Toast.error({
          message: 'Ha ocurrido un error',
        })
      } else {
        return resp.result
      }
    } catch (err) {
      console.log('Error: ' + err)
    }
  },
  async loadDocumentTask({ commit }, { tipoTarea, usuario }) {
    try {
      let resp = await this.$auth.requestWith('claveUnica', {
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
    try {
      let resp = await this.$auth.requestWith('claveUnica', {
        method: 'GET',
        url: '/documentos/' + id,
      })
      const [valid, Toast] = isValidResponse(resp)
      if (!valid) {
        Toast.error({
          message: 'Ha ocurrido un error',
        })
      } else {
        return resp.result
      }
    } catch (err) {
      console.log('Error: ' + err)
    }
    return null
  },
  async getTramitacion({ commit }, id) {
    try {
      let resp = await this.$auth.requestWith('claveUnica', {
        method: 'GET',
        url: '/documentos/' + id + '/tareas',
      })
      const [valid, Toast] = isValidResponse(resp)
      if (!valid) {
        Toast.error({
          message: 'Ha ocurrido un error',
        })
      } else {
        return resp.result
      }
    } catch (err) {
      console.log('Error: ' + err)
    }
  },
  async deleteDocument({ commit }, id) {
    try {
      let resp = await this.$auth.requestWith('claveUnica', {
        method: 'DELETE',
        url: '/documentos/' + id,
      })
      const [valid, Toast] = isValidResponse(resp)
      if (!valid) {
        Toast.error({
          message: 'Ha ocurrido un error',
        })
      } else {
        commit('deleteDocument', id)
        Toast.success({
          message: 'Documento eliminado',
        })
        return true
      }
    } catch (err) {
      Toast.error({
        message: 'Ha ocurrido un error',
      })
    }
    return false
  },
}
