import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.GCLOUD_API_KEY,
  authDomain: "news-archiver-7395b.firebaseapp.com",
  projectId: "news-archiver-7395b",
  storageBucket: "news-archiver-7395b.appspot.com",
  messagingSenderId: "930834474148",
  appId: "1:930834474148:web:6bc5815c65aacd874c7231",
  measurementId: "G-KXFWG9R3TK",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

export {
  firebaseApp,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  db,
  collection,
  addDoc,
  query,
  where,
  getDocs,
};
