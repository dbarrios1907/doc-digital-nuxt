import { isValidResponse } from '~/shared/utils/request'
import endpoints from '~/api/endpoints'

export const documentCreationState = () => ({
  documentInfoStep: {
    // "anexos": [
    //   {
    //     "id": 0,
    //     "infoCertificados": [
    //       {
    //         "certificado": "string",
    //         "nombreFirmante": "string",
    //         "runFirmante": "string"
    //       }
    //     ],
    //     "link": "string",
    //     "nombre": "string",
    //     "tipoArchivo": "ANEXO"
    //   }
    // ],
    // "archivoPrincipal": {
    //   "id": 0,
    //   "infoCertificados": [
    //     {
    //       "certificado": "string",
    //       "nombreFirmante": "string",
    //       "runFirmante": "string"
    //     }
    //   ],
    //   "link": "string",
    //   "nombre": "string",
    //   "tipoArchivo": "ANEXO"
    // },
    descripcion: undefined,
    folio: undefined,
    // "id": 0,
    isBorrador: true,
    // "isDelete": true,
    // "isFirmado": true,
    isReservado: true,
    materia: 'string',
    tipoDocumentoOficial: {
      createAt: '2021-03-26T04:05:44.029Z',
      descripcion: 'string',
      id: 0,
      updateAt: '2021-03-26T04:05:44.029Z',
    },
  },
  documentVisaStep: {},
  documentFirmaStep: {},
  documentFolioStep: {},
  documentDestinatariosStep: {},
})

export const state = () => ({
  documents: [],
  selectedDocument: null,
  documentTypeOptions: [],
  documentFileOptions: [],
  visaOptions: [],
  epochOptions: [],
  documentFileTypes: [],
  ...documentCreationState(),
  recibir: 0,
  enviar: 0,
})

export const getters = {
  getDocs: state => state.documents,
  documentTypeOptions: state => state.documentTypeOptions,
  documentSubjectOptions: state => state.documentSubjectOptions,
  visaOptions: state => state.visaOptions,
  epochOptions: state => state.epochOptions,
  documentFileTypes: state => state.documentFileTypes,
  getDocumentsCount: state => inbox => {
    return state[inbox]
  },
}

export const mutations = {
  setDocuments: (state, docs) => {
    state.documents = docs
  },
  setDocumentsCount: (state, { inbox, count }) => {
    state[inbox] = count
  },
  
  setDocumentsInbox: (state, [ inbox, documents, count ]) => {
    state[inbox] = count
    state.documents = documents
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
  async fetchTramiteProgress({ commit, rootState }, id) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.documentTramiteProgress(id))
    const [valid] = isValidResponse(resp)
    if (valid) {
      return resp.result
    }
  },
  async fetchDocumentTramite({ commit, rootState }, id) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.documentFetchTramite(id))
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
  async fetchDocumentTasks({ commit, rootState }, id) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.documentFetchTasks(id))
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

  async fetchFileTypeOptions({ commit, state, rootState }) {
    if (state.documentFileOptions.length > 0) return false
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.documentFileOptions)
    const [valid] = isValidResponse(resp)
    if (valid) {
      commit('saveStateProperty', {
        property: 'documentFileOptions',
        value: resp.result,
      })
    }
  },

  async fetchDocumentTypeOptions({ commit, state, rootState }) {
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

  async downloadDocumentMain({ commit, rootState }, id) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.documentDownloadMain(id))
    const [valid] = isValidResponse(resp)
    // @todo force download or preview
    return valid ? true : false
    //var blob = new Blob([resp], { type: 'text/html' })
    //var blobUrl = URL.createObjectURL(blob)
    //return blobUrl || ''
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
      return this.$router.replace('/')
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

  async rejectDocumentTramite({ commit, rootState }, id) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.fetchTasksRejected)
    const [valid] = isValidResponse(resp)
    if (valid) {
      return resp.result
    }
    return null
  },

  async downloadDocument({ commit, rootState }, id) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.documentDownloadMain(id))
    const [valid] = isValidResponse(resp)
    if (valid) {
      return resp.result
    }
    return null
  },
  async fetchDocumentSign({ commit, rootState }, { otp, params }) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.documentSign(otp, params))
    const [valid, Toast] = isValidResponse(resp)
    const text = otp == '0' ? 'rechazado' : 'firmado'
    if (valid) {
      Toast.success({
        message: `Documento ${text} satisfactoriamente - Fecha: ${resp.timestamp} hrs`,
      })
      this.getDocs()
      return true
    }
  },
  async fetchDocumentVisar({ commit, rootState }, id) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.documentVisar(id))
    const [valid, Toast] = isValidResponse(resp)
    if (valid) {
      Toast.success({
        message: `Documento visado satisfactoriamente - Fecha: ${resp.timestamp} hrs`,
      })
      return true
    }
  },
  async getDocumentsByInbox({ commit, rootState }, [inbox, params]) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.fetchTasksOffice(inbox, params))
    const [valid] = isValidResponse(resp)
    if (valid) {
      commit(
        'setDocumentsInbox',
        [ inbox, resp.result.map(({ documento }) => documento), resp.total_count ]
        
      )
    }
  },
  async getDocumentsByInboxCount({ commit, rootState }, [inbox, params]) {
    const resp = await this.$auth.requestWith(rootState.authStrategy, endpoints.fetchTasksOffice(inbox, params))
    const [valid] = isValidResponse(resp)
    if (valid) {
      commit('setDocumentsCount', { inbox, count: resp.total_count })
    }
  },
}
