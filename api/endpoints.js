export default {
  documentSubjectOptions: { url: '/tipos/tramitacion/documentos', method: 'GET' },
  documentTypeOptions: { url: '/tipos/tramitacion/documentos/archivo', method: 'GET' },
  roleOptions: { url: '/tipos/seguridad/roles', method: 'GET' },
  epochOptions: { url: '/tipos/tramitacion/etapas', method: 'GET' },
  visaOptions: { url: '/tipos/tramitacion/visaciones', method: 'GET' },
  regions: { url: '/tipos/distgeografica/regiones', method: 'GET' },
  provinces: id => ({ url: `/tipos/distgeografica/regiones/${id}/provincias`, method: 'GET' }),
  comunas: id => ({ url: `/tipos/distgeografica/regiones/provincias/{id}/comunas`, method: 'GET' }),

  fetchTasks: query => ({ url: '/documentos/tareas', method: 'GET', query }),
  fetchTasksVisa: '/documentos/tareas/visar',
  fetchTasksSign: '/documentos/tareas/firmar',
  fetchTasksRejected: { url: '/documentos/tareas/creacion/rechazadas', method: 'GET' },
  fetchTasksErasers: '/documentos/tareas/creacion/borradores',
  fetchTasksCompleted: '/documentos/tareas/creacion/completadas',
  fetchTasksOfficeSent: '/documentos/tareas/op/enviar',
  fetchTasksOfficeReceived: '/documentos/tareas/op/recibir',

  // document creation endpoints
  // models used same endpoint with different method to exec operations (delete, get, create, save)
  documentFetch: docId => ({ url: `/documentos/${docId}`, method: 'GET' }),
  documentCreate: params => ({ url: `/documentos/`, method: 'POST', params }),
  documentUpdate: params => ({ url: `/documentos/`, method: 'PUT', params }),
  documentDelete: docId => ({ url: `/documentos/${docId}`, method: 'DELETE' }),

  documentUpload: docId => ({ url: `/documentos/${docId}/anexos/archivo`, method: 'POST' }),
  documentDownload: (docId, fileId) => ({ url: `/documentos/${docId}/anexos/archivo/${fileId}`, method: 'GET' }),

  documentDownloadMain: docId => ({ url: `/documentos/${docId}/archivo`, method: 'GET' }),
  documentUploadMain: docId => ({ url: `/documentos/${docId}/archivo`, method: 'POST' }),
  documentDeleteMain: docId => ({ url: `/documentos/${docId}/archivo`, method: 'DELETE' }),

  documentFetchTramite: docId => ({ url: `/documentos/${docId}/tramitacion`, method: 'GET' }),
  documentCreateTramite: (docId, params) => ({ url: `/documentos/${docId}/tramitacion`, method: 'POST', params }),
  documentUpdateTramite: (docId, params) => ({ url: `/documentos/${docId}/tramitacion`, method: 'PUT', params }),
  documentDeleteTramite: docId => ({ url: `/documentos/${docId}/tramitacion/cancelar`, method: 'DELETE' }),

  documentFinalizeTramite: docId => ({ url: `/documentos/${docId}/tramitacion/enviar`, method: 'POST' }),
  documentTramiteProgress: docId => ({ url: `/documentos/${docId}/tramitacion/etapas`, method: 'GET' }),

  // models used same endpoint with different method to exec operations (delete, get, create, save)
  entitiesFetchAll: query => ({ url: `/entidades/${id}`, method: 'GET', query }),
  entitiesFetch: id => ({ url: `/entidades/${id}`, method: 'GET' }),
  entitiesCreate: params => ({ url: `/entidades/`, method: 'POST', params }),
  entitiesUpdate: params => ({ url: `/entidades/`, method: 'PUT', params }),
  entitiesDelete: id => ({ url: `/entidades/${id}`, method: 'DELETE' }),
}
