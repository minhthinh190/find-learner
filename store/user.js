import { authAPI } from '~/api/auth'
import { tutorAPI } from '~/api/tutor'

const userId = localStorage.getItem('uid')
const userEmail = localStorage.getItem('email')

export const state = () => ({
  id: userId ? userId : null,
  email: userEmail ? userEmail : null,
  profile: null
})

export const getters = {
  userId: (state) => {
    return state.id
  },

  userEmail: (state) => {
    return state.email
  },

  userProfile: (state) => {
    return state.profile
  }
}

export const mutations = {
  setUser (state, user) {
    state.id = user.id
    state.email = user.email
  },

  setProfile (state, profile) {
    state.profile = profile
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
  },

  async getUserProfile ({ commit }) {
    const userEmail = localStorage.getItem('email')
    const profile = await tutorAPI.getTutorProfile(userEmail)
    commit('setProfile', profile)
  }
}
