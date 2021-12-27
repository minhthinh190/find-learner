import { config } from '~/firebase/config'
import { initializeApp } from 'firebase/app'

import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where
} from 'firebase/firestore'

initializeApp(config)

const db = getFirestore()
const _rootCollection = 'user'
const _collection = 'bookings'

// Private API
const getAllUsers = async () => {
  const users = []
  const querySnapshot = await getDocs(
    collection(db, _rootCollection)
  )
  querySnapshot.forEach((doc) => {
    users.push(doc.id)
  })
  return users
}

const getUserRequestById = async (userDoc, requestId) => {
  const requests = []
  const queryRef = collection(db, _rootCollection, userDoc, _collection)
  const q = query(
    queryRef,
    where('id', '==', parseInt(requestId))
  )

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    requests.push(doc.data())
  })
  return requests
}

const getUserPendingRequests = async (userDoc) => {
  const pendingRequests = []
  const queryRef = collection(db, _rootCollection, userDoc, _collection)
  const q = query(queryRef, where('status', '==', 'waiting'))

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    pendingRequests.push(doc.data())
  })
  return pendingRequests
}

const filterUserPendingRequests = async (userDoc, queryFields) => {
  const pendingRequests = []
  const queryRef = collection(db, _rootCollection, userDoc, _collection)
  let q = null

  if (queryFields.subject.toLowerCase() === 'tất cả') {
    q = query(
      queryRef,
      where('status', '==', 'waiting')
    )
  } else {
    q = query(
      queryRef,
      where('status', '==', 'waiting'),
      where('subject', '==', queryFields.subject.toLowerCase())
    )
  }

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    pendingRequests.push(doc.data())
  })
  return pendingRequests
}

// Public API
const getAllPendingRequests = async () => {
  let allPendingRequests = []
  const allUsers = await getAllUsers()

  for (const user of allUsers) {
    const requests = await getUserPendingRequests(user)
    allPendingRequests = [...allPendingRequests, ...requests]
  }
  return allPendingRequests
}

const filterAllPendingRequests = async (queryFields) => {
  let allPendingRequests = []
  const allUsers = await getAllUsers()

  for (const user of allUsers) {
    const requests = await filterUserPendingRequests(user, queryFields)
    allPendingRequests = [...allPendingRequests, ...requests]
  }
  return allPendingRequests
}

const queryRequestById = async (requestId) => {
  let requests = []
  const allUsers = await getAllUsers()

  for (const user of allUsers) {
    const request = await getUserRequestById(user, requestId)
    requests = [...requests, ...request]
  }
  return requests
}

const updateTutorDataOfRequest = async (userDoc, requestId, tutorData) => {
  const docRef = doc(
    db,
    _rootCollection,
    userDoc,
    _collection,
    requestId.toString()
  )

  const res = await getDoc(docRef)
  const tutorList = res.data().tutors
  tutorList.push({ ...tutorData })

  return updateDoc(docRef, {
    tutors: tutorList
  })
}

const queryRequestByProperty = async (userDoc, property, value) => {
  const queryRef = collection(db, _rootCollection, userDoc, _collection)
  const q = query(queryRef, where(property, '==', value))

  const querySnapshot = await getDocs(q)
  const requestList = []

  querySnapshot.forEach((doc) => {
    requestList.push(doc.data())
  })
  return requestList
}

export const requestAPI = {
  getAllPendingRequests,
  filterAllPendingRequests,
  queryRequestByProperty,
  queryRequestById,
  updateTutorDataOfRequest
}
