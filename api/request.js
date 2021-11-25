import { config } from '~/firebase/config'
import { initializeApp } from 'firebase/app'

import {
  getFirestore,
  collection,
  getDocs,
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

  if (queryFields.subject === 'all') {
    q = query(
      queryRef,
      where('status', '==', 'waiting')
    )
  } else {
    q = query(
      queryRef,
      where('status', '==', 'waiting'),
      where('subject', '==', queryFields.subject)
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

export const requestAPI = {
  getAllPendingRequests,
  filterAllPendingRequests
}
