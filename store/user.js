import { authAPI } from '~/api/auth'

const userId = localStorage.getItem('uid')
const userEmail = localStorage.getItem('email')

export const state = () => ({
  id: userId ? userId : null,
  email: userEmail ? userEmail : null
})

export const getters = {
  userId: (state) => {
    return state.id
  },

  userEmail: (state) => {
    return state.email
  }
}

export const mutations = {
  setUser (state, user) {
    state.id = user.id
    state.email = user.email
  }
}

export const actions = {
  signIn ({ commit }, { email, password }) {
    return authAPI.signUserIn(email, password)
      .then(({ uid, email}) => {
        commit('setUser', { id: uid, email })
      })
  },

  signUp ({ commit }, { email, password }) {
    return authAPI.signUserUp(email, password)
      .then(({ uid, email }) => {
        commit('setUser', { id: uid, email })
      })
  },

  signOut ({ commit }) {
    return authAPI.signUserOut()
      .then(() => {
        commit('setUser', { id: null, email: null })
      })
  }
}
