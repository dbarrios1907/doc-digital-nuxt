export const state = vm => ({
  expired: false,
  closed: false,
})

// export const getters = {}

export const mutations = {
  closeSession: (state, payload) => {
    state.closed = true
  },

  expireSession: (state, payload) => {
    state.expired = true
  },
}

export const actions = {
  closeSession({ commit }) {
    commit('closeSession')
  },

  expireSession({ commit }) {
    commit('expireSession')
  },
}
