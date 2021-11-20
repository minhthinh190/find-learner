import { config } from '~/firebase/config'
import { initializeApp } from "@firebase/app"

import {
  getFirestore,
  doc,
  setDoc
} from 'firebase/firestore'

initializeApp(config)

const db = getFirestore()
const _rootCollection = 'tutor'

const updateTutorProfile = (tutorDoc, tutorProfile) => {
  const docRef = doc(db, _rootCollection, tutorDoc)

  return setDoc(docRef, {
    ...tutorProfile
  })
}

export const tutorAPI = {
  updateTutorProfile
}
