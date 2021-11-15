import { initializeApp } from 'firebase/app'
import { config } from '~/firebase/config'
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where
} from 'firebase/firestore'

initializeApp(config)

const db = getFirestore()
const _rootCollection = 'user'
const _collection = 'bookings'

const createBookingCounter = async (userDoc) => {
  const docRef = doc(db, _rootCollection, userDoc)
  await setDoc(docRef, {
    bookingCount: 0,
    bookingIdCount: 0
  })
}

const createNewBooking = async (userDoc, bookingData) => {
  const currentBookingId = await getBookingIdCount(userDoc)
  const newBookingId = currentBookingId + 1

  const docRef = doc(db, _rootCollection, userDoc, _collection, newBookingId.toString())

  return setDoc(docRef, { id: newBookingId, ...bookingData })
    .then(async () => {
      await updateBookingIdCount(userDoc)
      await updateNumberOfBookings(userDoc)
    })
}

const getBookingList = async (userDoc) => {
  const querySnapshot = await getDocs(
    collection(db, _rootCollection, userDoc, _collection)
  )
  const bookingList = []

  querySnapshot.forEach((doc) => {
    bookingList.push(doc.data())
  })
  return bookingList
}

const getBookingIdCount = async (userDoc) => {
  const docRef = doc(db, _rootCollection, userDoc)
  const res = await getDoc(docRef)
  const bookingIdCount = res.data().bookingIdCount

  return bookingIdCount
}

const getNumberOfBookings = async (userDoc) => {
  const docRef = doc(db, _rootCollection, userDoc)
  const res = await getDoc(docRef)
  const bookingCount = res.data().bookingCount

  return bookingCount
}

const updateNumberOfBookings = async (userDoc) => {
  const numberOfBookings = await getNumberOfBookings(userDoc)
  const docRef = doc(db, _rootCollection, userDoc)

  updateDoc(docRef, {
    bookingCount: numberOfBookings + 1
  })
}

const updateBookingIdCount = async (userDoc) => {
  const bookingIdCount = await getBookingIdCount(userDoc)
  const docRef = doc(db, _rootCollection, userDoc)

  updateDoc(docRef, {
    bookingIdCount: bookingIdCount + 1
  })
}

const queryBookingByProperty = async (userDoc, property, value) => {
  const queryRef = collection(db, _rootCollection, userDoc, _collection)
  const q = query(queryRef, where(property, '==', value))

  const querySnapshot = await getDocs(q)
  const bookingList = []

  querySnapshot.forEach((doc) => {
    bookingList.push(doc.data())
  })
  return bookingList
}

export const bookingAPI = {
  createBookingCounter,
  createNewBooking,
  getBookingList,
  getNumberOfBookings,
  queryBookingByProperty
}
