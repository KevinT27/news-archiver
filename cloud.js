
/* if (process.env.NODE_ENV !== production) {
  import dotenv from "dotenv";
  dotenv.config();
} */


import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.GCLOUD_API_KEY,
  authDomain: process.env.GCLOUD_AUTH_DOMAIN,
  projectId: process.env.GCLOUD_PROJECTID,
  storageBucket: process.env.GCLOUD_STORAGE_BUCKET,
  messagingSenderId: process.env.GCLOUD_MESSAGING_SENDER_ID,
  appId: process.env.GCLOUD_APPID,
  measurementId: process.env.GCLOUD_MEASUREMENTID,
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage(firebaseApp, process.env.GCLOUD_STORAGEURL);

export {
  firebaseApp,
  getStorage,
  ref,
  storage,
  uploadBytes,
  getDownloadURL,
  db,
  collection,
  addDoc,
  query,
  where,
  getDocs,
};
