// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

  const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APP,
  authDomain: "employeemanagement-a61ae.firebaseapp.com",
  projectId: "employeemanagement-a61ae",
  storageBucket: "employeemanagement-a61ae.firebasestorage.app",
  messagingSenderId: "510615003274",
  appId: "1:510615003274:web:788e1d48740461dfa84d73",
  measurementId: "G-N02TE1YZKG"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const Auth = getAuth()
export const Db = getFirestore(app)


