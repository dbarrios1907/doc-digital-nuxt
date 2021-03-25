import { isValidResponse } from '~/shared/utils/request'
import endpoints from '~/api/endpoints'

export const state = () => ({
  documents: [],
  selectedDocument: null,
  documentTypeOptions: [],
  documentSubjectOptions: [],
  visaOptions: [],
  epochOptions: [],
  documentFileTypes: [],
})

export const getters = {
  getDocs: state => state.documents,
  documentTypeOptions: state => state.documentTypeOptions,
  documentSubjectOptions: state => state.documentSubjectOptions,
  visaOptions: state => state.visaOptions,
  epochOptions: state => state.epochOptions,
  documentFileTypes: state => state.documentFileTypes,
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

  saveStateProperty(state, payload) {
    state[payload.property] = payload.value
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
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.documentDelete(id))
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

  // document creation actions

  async fetchDocumentTypeOptions({ commit, state, rootState }) {
    console.log(state)
    if (state.documentTypeOptions.length > 0) return false
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.documentTypeOptions)
    const [valid] = isValidResponse(resp)
    if (valid) {
      commit('saveStateProperty', {
        property: 'documentTypeOptions',
        value: resp.result,
      })
    }
  },

  async fetchDocumentSubjectOptions({ commit, state, rootState }) {
    if (state.documentSubjectOptions.length > 0) return false
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.documentSubjectOptions)
    const [valid] = isValidResponse(resp)
    if (valid) {
      commit('saveStateProperty', {
        property: 'documentSubjectOptions',
        value: resp.result,
      })
    }
  },

  async fetchVisaOptions({ commit, state, rootState }) {
    if (state.visaOptions.length > 0) return false
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.visaOptions)
    const [valid] = isValidResponse(resp)
    if (valid) {
      commit('saveStateProperty', {
        property: 'visaOptions',
        value: resp.result,
      })
    }
  },

  async fetchEpochOptions({ commit, state, rootState }) {
    if (state.epochOptions.length > 0) return false
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.epochOptions)
    const [valid] = isValidResponse(resp)
    if (valid) {
      commit('saveStateProperty', {
        property: 'epochOptions',
        value: resp.result,
      })
    }
  },

  async fetchDocumentFileTypes({ commit, state, rootState }) {
    if (state.documentFileTypes.length > 0) return false
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.documentFileTypes)
    const [valid] = isValidResponse(resp)
    if (valid) {
      commit('saveStateProperty', {
        property: 'documentFileTypes',
        value: resp.result,
      })
    }
  },

  async createDocument({ commit, rootState }, params) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.documentCreate(params))
    const [valid, Toast] = isValidResponse(resp)
    if (valid) {
      Toast.success({
        message: resp?.message,
      })
    }
  },

  async updateDocument({ commit, rootState }, params) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.documentUpdate(params))
    const [valid, Toast] = isValidResponse(resp)
    if (valid) {
      Toast.success({
        message: resp?.message,
      })
    }
  },

  async fetchDocument({ commit, rootState }, id) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.documentFetch(id))
    const [valid] = isValidResponse(resp)
    return valid ? resp?.result || {} : {}
  },

  async attachFileToDocument({ commit, rootState }, id, file) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, {
      ...endpoints.documentUpload(id),
      file,
    })
    const [valid] = isValidResponse(resp)
    return valid ? true : false
  },

  async downloadAttachment({ commit, rootState }, id, fileId) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.documentDownload(id, fileId))
    const [valid] = isValidResponse(resp)
    // @todo force download or preview
    return valid ? true : false
  },

  async downloadDocumentMain({ commit, rootState }, id, fileId) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.documentDownloadMain(id, fileId))
    const [valid] = isValidResponse(resp)
    // @todo force download or preview
    return valid ? true : false
  },

  async uploadDocumentMain({ commit, rootState }, id, file) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, {
      ...endpoints.documentUploadMain(id),
      file,
    })
    const [valid] = isValidResponse(resp)
    return valid ? true : false
  },

  async deleteDocumentMain({ commit, rootState }, id) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.documentDeleteMain(id))
    const [valid, Toast] = isValidResponse(resp)
    if (valid) {
      Toast.success({
        message: resp?.message,
      })
      return true
    }
  },

  async fetchDocumentTramite({ commit, rootState }, id) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.documentFetchTramite(id))
    const [valid, Toast] = isValidResponse(resp)
    if (valid) {
      Toast.success({
        message: resp?.message,
      })
      return true
    }
  },

  async createDocumentTramite({ commit, rootState }, id, params) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.documentCreateTramite(id, params))
    const [valid, Toast] = isValidResponse(resp)
    if (valid) {
      Toast.success({
        message: resp?.message || 'Documento en trámite creado satisfactoriamente',
      })
      return true
    }
  },

  async updateDocumentTramite({ commit, rootState }, id, params) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.documentUpdateTramite(id, params))
    const [valid, Toast] = isValidResponse(resp)
    if (valid) {
      Toast.success({
        message: resp?.message || 'Documento en trámite actualizado satisfactoriamente',
      })
      return true
    }
  },

  async deleteDocumentTramite({ commit, rootState }, id) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.documentDeleteTramite(id))
    const [valid, Toast] = isValidResponse(resp)
    if (valid) {
      Toast.success({
        message: resp?.message || 'Documento en trámite eliminado satisfactoriamente',
      })
      return true
    }
  },

  async finalizeDocumentTramite({ commit, rootState }, id) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.documentFinalizeTramite(id))
    const [valid, Toast] = isValidResponse(resp)
    if (valid) {
      Toast.success({
        message: resp?.message || 'Documento en trámite se ha finalizado satisfactoriamente',
      })
      return true
    }
  },
}
