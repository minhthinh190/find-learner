import { config } from '~/firebase/config'
import { initializeApp } from "@firebase/app"

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore'

initializeApp(config)

const db = getFirestore()
const _rootCollection = 'tutor'

// Private API
const getTutorIdCounter = async () => {
  const docRef = doc(db, _rootCollection, 'management')
  const res = await getDoc(docRef)
  const tutorIdCounter = res.data().tutorIdCounter

  return tutorIdCounter
}

const increaseTutorIdCounter = async () => {
  const tutorIdCounter = await getTutorIdCounter()
  const docRef = doc(db, _rootCollection, 'management')

  updateDoc(docRef, {
    tutorIdCounter: tutorIdCounter + 1
  })
}

// Public API
const getTutorProfile = async (tutorDoc) => {
  const docRef = doc(db, _rootCollection, tutorDoc)
  const res = await getDoc(docRef)
  const tutorProfile = res.data()

  return tutorProfile
}

const updateTutorProfile = async (tutorDoc, tutorProfile) => {
  const tutorIdCounter = await getTutorIdCounter()
  const docRef = doc(db, _rootCollection, tutorDoc)

  return setDoc(docRef, { id: tutorIdCounter + 1, ...tutorProfile })
    .then(async () => {
      await increaseTutorIdCounter()
    })
}

export const tutorAPI = {
  getTutorProfile,
  updateTutorProfile
}
