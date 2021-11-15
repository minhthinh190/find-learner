import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore'

const db = getFirestore()

const getDataInDoc = (collection, docID) => {
  const docRef = doc(db, collection, docID)
  return getDoc(docRef)
}

const addDataToDoc = (collection, docID, data) => {
  const docRef = doc(db, collection, docID)
  return setDoc(docRef, data)
}

const addDataToSubDoc = (collection, docID, subCollection, subDocID, data) => {
  const docRef = doc(db, collection, docID, subCollection, subDocID)
  return setDoc(docRef, data)
}

const updateDataInDoc = (collection, docID, data) => {
  const docRef = doc(db, collection, docID)
  return updateDoc(docRef, data)
}

export const dbService = {
  getDataInDoc,
  addDataToDoc,
  addDataToSubDoc,
  updateDataInDoc
}
