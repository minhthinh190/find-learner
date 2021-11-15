import { bookingAPI } from '~/api/booking'

export const state = () => ({
  list: null,
  booking: null
})

export const getters = {
  numberOfBookings: (state) => {
    return state.list.length
  },

  bookingList: (state) => {
    return state.list
  }
}

export const mutations = {
  setList (state, list) {
    state.list = list
  },

  setBooking (state, booking) {
    state.booking = booking
  }
}

export const actions = {
  async getBookings ({ commit, rootState }) {
    const userEmail = rootState.user.email
    const bookingList = await bookingAPI.getBookingList(userEmail)
    commit('setList', bookingList)
  },

  async getBookingsByStatus ({ commit, rootState }, { property, value }) {
    const userEmail = rootState.user.email
    const bookingList = await bookingAPI.queryBookingByProperty(userEmail, property, value)
    commit('setList', bookingList)
  },

  async getBookingById ({ commit, rootState }, { id }) {
    const userEmail = rootState.user.email
    const bookingList = await bookingAPI.queryBookingByProperty(userEmail, 'id', id)
    commit('setBooking', bookingList[0])
  }
}
