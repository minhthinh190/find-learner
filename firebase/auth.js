import { app } from '~/firebase/config.js'
import { getAuth } from 'firebase/auth'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword
} from 'firebase/auth'

const auth = getAuth(app)

const signUserIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

const signUserUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

const signUserOut = () => {
  return signOut(auth)
}

const changePassword = (newPassword) => {
  return updatePassword(auth.currentUser, newPassword)
}

export const authService = {
  signUserIn,
  signUserUp,
  signUserOut,
  changePassword
}
