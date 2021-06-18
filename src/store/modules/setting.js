const state = {
  board: [3, 1, 2],
  players: ['A', 'B']
}

const mutations = {
  SETPLAYERS: (state, data) => {
    if (!data) return
    state.players = data
  },
  INITBOARD: (state, data) => {
    if (!data) return
    state.board = data
  }
}

const actions = {
  SetPlayers ({ commit, dispatch }, info) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(info)) reject(new Error('players type'))
      commit('SETPLAYERS', info)
      resolve()
    })
  },
  SetBoard ({ commit, dispatch }, info) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(info)) reject(new Error('border type'))
      commit('INITBOARD', info)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
