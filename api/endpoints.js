export default {
  documentSubjectOptions: { url: '/tipos/tramitacion/documentos', method: 'GET' },
  documentTypeOptions: { url: '/tipos/tramitacion/documentos/archivo', method: 'GET' },
  roleOptions: { url: '/tipos/seguridad/roles', method: 'GET' },
  epochOptions: { url: '/tipos/tramitacion/etapas', method: 'GET' },
  visaOptions: { url: '/tipos/tramitacion/visaciones', method: 'GET' },
  regions: { url: '/tipos/distgeografica/regiones', method: 'GET' },
  provinces: id => ({ url: `/tipos/distgeografica/regiones/${id}/provincias`, method: 'GET' }),
  comunas: id => ({ url: `/tipos/distgeografica/regiones/provincias/${id}/comunas`, method: 'GET' }),

  fetchTasks: params => ({ url: '/documentos/tareas', method: 'GET', params }),
  fetchTasksVisa: '/documentos/tareas/visar',
  fetchTasksSign: '/documentos/tareas/firmar',
  fetchTasksRejected: '/documentos/tareas/creacion/rechazadas',
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
  //Entities
  entitiesFetchAll: params => ({ url: `/entidades/`, method: 'GET', params }),
  entitiesFetch: id => ({ url: `/entidades/${id}`, method: 'GET' }),
  entitiesCreate: data => ({ url: `/entidades/`, method: 'POST', data }),
  entitiesUpdate: data => ({ url: `/entidades/`, method: 'PUT', data }),
  entitiesDelete: id => ({ url: `/entidades/${id}`, method: 'DELETE' }),

  //Users
  usersFetchAll: params => ({ url: `/usuarios/`, method: 'GET', params }),
  usersFetch: id => ({ url: `/usuarios/${id}`, method: 'GET' }),
  usersCreate: data => ({ url: `/usuarios/`, method: 'POST', data }),
  usersUpdate: data => ({ url: `/usuarios/`, method: 'PUT', data }),
  usersDelete: id => ({ url: `/usuarios/${id}`, method: 'DELETE' }),
  usersStatus: (id, status) => ({ url: `/usuarios/${id}/activar/${status}`, method: 'POST' }),
}
