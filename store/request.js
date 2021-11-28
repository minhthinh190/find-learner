import { requestAPI } from '~/api/request'

export const state = () => ({
  perPage: 12,
  list: null,
  paginatedRequestList: [],
  request: null
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
  },

  setRequest (state, request) {
    state.request = request
  }
}

export const actions = {
  async getRequests ({ commit }) {
    const requestList = await requestAPI.getAllPendingRequests()
    commit('setList', requestList)
  },

  async filterRequests ({ commit }, queryFields) {
    const requestList = await requestAPI.filterAllPendingRequests(queryFields)
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
  },

  async getRequestById ({ commit }, { userEmail, id }) {
    const requestList = await requestAPI.queryRequestByProperty(
      userEmail, 'id', id
    )
    commit('setRequest', requestList[0])
  }
}
