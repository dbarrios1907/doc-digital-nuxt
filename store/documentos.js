export const STRATEGY = 'claveUnica'
import { isValidResponse } from '~/shared/utils/request'
export const headers = {
  Authorization:
    'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJNYXJpYSBDYXJtZW4gRGUgbG9zIGFuZ2VsZXMgRGVsIHJpbyBHb256YWxleiIsImN0eCI6eyJrZXkiOjQsInJ1biI6OTk5OTk5OTksIm5vbWJyZSI6Ik1hcmlhIENhcm1lbiBEZSBsb3MgYW5nZWxlcyBEZWwgcmlvIEdvbnphbGV6IiwiY2FyZ28iOiJKZWZlIMOBcmVhIiwiZW50aWRhZElkIjoxLCJlbnRpZGFkTm9tYnJlIjoiRW50aWRhZCBUZXN0IEtFIiwiY29udGV4dFR5cGUiOiJDVFhfVVNFUiJ9LCJpZCI6NCwiY3R4X3R5cGUiOiJ1c3IiLCJleHAiOjE2MTYwNTE3NjEsImlhdCI6MTYxNjA0ODE2MSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU1VBUklPIiwiUk9MRV9PRklDSU5BX1BBUlRFUyIsIlJPTEVfQURNSU4iLCJST0xFX0pFRkVfU0VSVklDSU8iLCJST0xFX1NVUEVSQURNSU4iLCJST0xFX0FETUlOIl19.O-5q7bx8yem9dOkCG9tuIzG5DsCJqtHlVdESpruZvo4wvq2IKkkdekdIkoofWcprTRv8bvMn5OzNPzHdGgXkMQ',
}
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
        //headers: headers,
        /*headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },*/
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
