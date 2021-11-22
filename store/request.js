import { requestAPI } from '~/api/request'

export const state = () => ({
  list: null,
  perPage: 12,
  paginatedRequestList: []
})

export const getters = {
  requestList: (state) => {
    return state.list
  },

  requestListLength: (state) => {
    return state.list.length
  },

  paginatedRequestList: (state) => {
    return state.paginatedRequestList
  }
}

export const mutations = {
  setList (state, list) {
    state.list = list
  },

  setPaginatedRequestList (state, paginatedRequestList) {
    state.paginatedRequestList = paginatedRequestList
  }
}

export const actions = {
  async getRequests ({ commit }) {
    const requestList = await requestAPI.getAllPendingRequests()
    commit('setList', requestList)
  },

  paginateRequestList ({ state, commit }) {
    const paginatedRequestList = state.list.reduce((resultArray, item, index) => {
      const pageIndex = Math.floor(index / state.perPage)
      if (!resultArray[pageIndex]) {
        resultArray[pageIndex] = []
      }
      resultArray[pageIndex].push(item)

      return resultArray
    }, [])
    commit('setPaginatedRequestList', paginatedRequestList)
  }
}
