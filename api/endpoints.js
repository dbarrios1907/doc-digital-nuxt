export default {
  fetchUserDashboard: userId => ({ url: `/documentos/tareas/resumenusuario/${userId}`, method: 'GET' }),

  documentTypeOptions: { url: '/tipos/tramitacion/documentos', method: 'GET' },
  documentFileOptions: { url: '/tipos/tramitacion/documentos/archivo', method: 'GET' },
  roleOptions: { url: '/tipos/seguridad/roles', method: 'GET' },
  epochOptions: { url: '/tipos/tramitacion/etapas', method: 'GET' },
  visaOptions: { url: '/tipos/tramitacion/visaciones', method: 'GET' },
  regions: { url: '/tipos/distgeografica/regiones', method: 'GET' },
  provinces: id => ({ url: `/tipos/distgeografica/regiones/${id}/provincias`, method: 'GET' }),
  comunas: id => ({ url: `/tipos/distgeografica/regiones/provincias/${id}/comunas`, method: 'GET' }),

  fetchTasks: params => ({ url: '/documentos/tareas', method: 'GET', params }),
  fetchTasksVisa: { url: '/documentos/tareas/visar', method: 'GET' },
  fetchTasksSign: { url: '/documentos/tareas/firmar', method: 'GET' },
  fetchTasksRejected: { url: '/documentos/tareas/creacion/rechazadas', method: 'GET' },
  fetchTasksErasers: { url: '/documentos/tareas/creacion/borradores', method: 'GET' },
  fetchTasksCompleted: { url: '/documentos/tareas/creacion/completadas', method: 'GET' },
  fetchTasksOfficeSent: { url: '/documentos/tareas/op/enviar', method: 'GET' },
  fetchTasksOfficeReceived: { url: '/documentos/tareas/op/recibir', method: 'GET' },
  documentFetchTasks: docId => ({ url: `/documentos/${docId}/tareas`, method: 'GET' }),
  fetchTasksOffice: inbox => ({ url: `/documentos/tareas/op/${inbox}`, method: 'GET' }),

  // document creation endpoints
  // models used same endpoint with different method to exec operations (delete, get, create, save)
  documentFetch: docId => ({ url: `/documentos/${docId}`, method: 'GET' }),
  documentCreate: data => ({ url: `/documentos/`, method: 'POST', data }),
  documentUpdate: params => ({ url: `/documentos/`, method: 'PUT', params }),
  documentDelete: docId => ({ url: `/documentos/${docId}`, method: 'DELETE' }),

  documentSign: (otp, data) => ({
    url: `/documentos/${data.tareaId}/tareas/firmar/${otp}`,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data,
  }),

  documentVisar: docId => ({
    url: `/documentos/${docId}/tareas/visar`,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data: {},
  }),

  documentUpload: docId => ({ url: `/documentos/${docId}/anexos/archivo`, method: 'POST' }),
  documentDownload: (docId, fileId) => ({ url: `/documentos/${docId}/anexos/archivo/${fileId}`, method: 'GET' }),

  documentTrazaDownload: docId => ({ url: `/api/documentos/${docId}/archivo/comprobante`, method: 'GET' }),
  documentDownloadMain: docId => ({ url: `/documentos/${docId}/archivo`, method: 'GET' }),
  documentUploadMain: docId => ({ url: `/documentos/${docId}/archivo`, method: 'POST' }),
  documentDeleteMain: docId => ({ url: `/documentos/${docId}/archivo`, method: 'DELETE' }),

  documentFetchTramite: docId => ({ url: `/documentos/${docId}/tramitacion`, method: 'GET' }),
  documentCreateTramite: (docId, data) => ({ url: `/documentos/${docId}/tramitacion`, method: 'POST', data }),
  documentUpdateTramite: (docId, data) => ({ url: `/documentos/${docId}/tramitacion`, method: 'PUT', data }),
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
  usersSubrogados: id => ({ url: `/usuarios/${id}/subrogados`, method: 'GET' }),
  usersSetSubrogancia: (id, status) => ({ url: `/usuarios/${id}/subrogante/activar/${status}`, method: 'POST' }),
}
