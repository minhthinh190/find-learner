export const state = () => ({
  message: null,
  color: null
})

export const mutations = {
  setNotification (state, data) {
    state.message = data.message
    state.color = data.color
  }
}

export const actions = {
  showNotification (context, data) {
    context.commit('setNotification', data)
  }
}
