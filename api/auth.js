import { config } from '~/firebase/config'
import { authService } from '~/firebase/auth'
import {
  getFirestore,
  collection,
  getDocs
} from 'firebase/firestore'
import { initializeApp } from '@firebase/app'

initializeApp(config)

const db = getFirestore()
const _rootCollection = 'tutor'

const signUserIn = (email, password) => {
  return authService.signUserIn(email, password)
    .then((res) => {
      const { uid, email } = res.user
      localStorage.setItem('uid', uid)
      localStorage.setItem('email', email)

      return { uid, email }
    })
}

const signUserUp = (email, password) => {
  return authService.signUserUp(email, password)
    .then((res) => {
      const { uid, email } = res.user
      localStorage.setItem('uid', uid)
      localStorage.setItem('email', email)

      return { uid, email }
    })
}

const signUserOut = () => {
  return authService.signUserOut()
    .then(() => {
      localStorage.removeItem('uid')
      localStorage.removeItem('email')
    })
}

const getTutors = async () => {
  const querySnapshot = await getDocs(
    collection(db, _rootCollection)
  )
  querySnapshot.forEach((doc) => {
    console.log(doc.id)
  })
}

export const authAPI = {
  getTutors,
  signUserIn,
  signUserUp,
  signUserOut
}
