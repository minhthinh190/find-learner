import { classAPI } from '~/api/class'

export const state = () => ({
  list: null,
  class: null
})

export const getters = {
  classList: (state) => {
    return state.list
  }
}

export const mutations = {
  setList (state, list) {
    state.list = list
  },

  setClass (state, classData) {
    state.class = classData
  }
}

export const actions = {
  async getClassList ({ commit }) {
    const classList = await classAPI.getAllClassData()
    commit('setList', classList)
  },

  async getClassListByStatus ({ commit }, status) {
    const classList = await classAPI.getClassDataByStatus(status)
    commit('setList', classList)
  },

  async getClassById ({ commit }, { userEmail, id }) {
    const classData = await classAPI.getClassDataById(
      userEmail, id
    )
    commit('setClass', classData[0])
  }
}
