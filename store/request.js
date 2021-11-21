import { requestAPI } from '~/api/request'

export const state = () => ({
  list: null,
  perPage: 5
})

export const getters = {
  requestList: (state) => {
    return state.list
  },

  requestListLength: (state) => {
    return state.list.length
  },

  paginatedRequestList: (state) => {
    const paginatedList = state.list.reduce((resultArray, item, index) => {
      const pageIndex = Math.floor(index / state.perPage)
      if (!resultArray[pageIndex]) {
        resultArray[pageIndex] = []
      }
      resultArray[pageIndex].push(item)

      return resultArray
    }, [])

    return paginatedList 
  }
}

export const mutations = {
  setList (state, list) {
    state.list = list
  }
}

export const actions = {
  async getRequests ({ commit }) {
    const requestList = await requestAPI.getAllPendingRequests()
    commit('setList', requestList)
  }
}
