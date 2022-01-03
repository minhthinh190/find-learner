import { config } from '~/firebase/config'
import { initializeApp } from 'firebase/app'
import { requestAPI } from '~/api/request'

import {
  getFirestore,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore'

initializeApp(config)

const db = getFirestore()
const _rootCollection = 'tutor'
const _collection = 'bookings'

// Private API
const getAllClassIds = async (tutorDoc) => {
  const docRef = doc(db, _rootCollection, tutorDoc)
  const res = await getDoc(docRef)
  const classIds = res.data().class

  return classIds
}

// Public API
const getAllClassData = async () => {
  let tutorEmail = localStorage.getItem('email')
  let classIds = await getAllClassIds(tutorEmail)
  let classList = []

  for (const item of classIds) {
    const classData = await requestAPI.getUserRequestById(
      item.contact, item.id
    )
    classList = [...classList, ...classData]
  }
  return classList
}

const getClassDataByStatus = async (status) => {
  let tutorEmail = localStorage.getItem('email')
  let allClassIds = await getAllClassIds(tutorEmail)
  let classIdsByStatus = []
  let classList = []

  allClassIds.forEach((item) => {
    if (item.status === status) {
      classIdsByStatus.push(item)
    }
  })

  for (const item of classIdsByStatus) {
    const classData = await requestAPI.getUserRequestById(
      item.contact, item.id
    )
    classList = [...classList, ...classData]
  }
  return classList
}

const getClassDataById = async (userEmail, id) => {
  const classList = await requestAPI.getUserRequestById(
    userEmail, id
  )
  return classList
}

const updateClassStatus = async (id, status) => {
  let tutorDoc = localStorage.getItem('email')
  let classIds = await getAllClassIds(tutorDoc)

  classIds.forEach((item) => {
    if (item.id === id) {
      item.status = status
    }
  })
  const docRef = doc(db, _rootCollection, tutorDoc)
  await updateDoc(docRef, { class: classIds })
}

const rejectClass = async (id) => {
  let tutorDoc = localStorage.getItem('email')
  let classIds = await getAllClassIds(tutorDoc)
  let newClassIds = []

  classIds.forEach((item) => {
    if (item.id !== id) {
      newClassIds.push(item)
    }
  })
  const docRef = doc(db, _rootCollection, tutorDoc)
  await updateDoc(docRef, { class: newClassIds })
}

export const classAPI = {
  getAllClassData,
  getClassDataByStatus,
  getClassDataById,
  updateClassStatus,
  rejectClass
}
