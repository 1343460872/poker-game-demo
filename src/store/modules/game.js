import utils from '@/utils/utils'

const initState = () => ({
  status: 0,
  board: [],
  index: 0,
  activePlayer: null,
  nextPlayer: null,
  activeRow: null,
  winer: null
})

const state = initState()

const getters = {
  nextDisabled: (state) => {
    return state.board.toString().includes('active') === false
  },
  round: (state) => {
    return parseInt(state.index / 2)
  }
}

const mutations = {
  RESETSTATE: (state) => {
    state = Object.assign({}, initState())
  },
  SETBOARD: (state, data) => {
    if (!data) return
    state.board = data
  },
  SETPLAYER: (state, data) => {
    if (!data) return
    state.activePlayer = data
  },
  SETNEXTPLAYER: (state, data) => {
    if (!data) return
    state.nextPlayer = data
  }
}

const actions = {
  SetBoard ({ commit, dispatch }, info) {
    return new Promise((resolve, reject) => {
      commit('SETBOARD', utils.arrayFill(info))
      resolve()
    })
  },
  PickPorker ({ commit, dispatch }, { row, i }) {
    return new Promise((resolve, reject) => {
      if (state.status === 'end') return
      if (state.board[row][i] === 'selected') return
      if (state.activeRow === null || row === state.activeRow) {
        dispatch('UpdateBoard', { row, i, type: 'active' })
        const active = state.board[row].includes('active')
        state.activeRow = active ? row : null
        resolve()
      }
    })
  },
  NextPlayer ({ commit, dispatch, state, rootState }) {
    return new Promise((resolve, reject) => {
      let newBoard = state.board.slice(0)
      state.index++
      state.activeRow = null

      //  变更状态
      const str = JSON.stringify(newBoard).replace(/active/g, 'selected')
      newBoard = JSON.parse(str)
      commit('SETBOARD', newBoard)

      // 结束
      const remain = newBoard.toString().match(/0/g)
      let winer = null
      if (remain === null) winer = state.nextPlayer
      if (remain?.length === 1) winer = state.activePlayer
      if (winer) {
        resolve(winer)
        state.winer = winer
        state.status = 'end'
        return
      }

      // 切换玩家
      commit('SETPLAYER', rootState.setting.players[state.index % 2])
      commit('SETNEXTPLAYER', rootState.setting.players[(state.index + 1) % 2])
      resolve()
    })
  },
  UpdateBoard ({ commit, dispatch, state }, { row, i, type }) {
    return new Promise((resolve, reject) => {
      const newBoard = state.board.slice(0)
      newBoard[row][i] = newBoard[row][i] === type ? 0 : type
      console.log(newBoard)
      commit('SETBOARD', newBoard)
      resolve()
    })
  },
  InitGame ({ commit, dispatch, state, rootState }) {
    return new Promise((resolve, reject) => {
      console.log(rootState.setting.board)
      commit('RESETSTATE')
      dispatch('SetBoard', rootState.setting.board)
      dispatch('InitPlayer')
      state.status = 'ing'
      resolve()
    })
  },
  InitPlayer ({ commit, dispatch, state, rootState }) {
    return new Promise((resolve, reject) => {
      commit('SETPLAYER', rootState.setting.players[0])
      commit('SETNEXTPLAYER', rootState.setting.players[1])
      resolve()
    })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
