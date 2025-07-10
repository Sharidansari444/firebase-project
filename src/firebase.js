/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAqCR-oyb6B5CAwFoJ1rOVOOSn0tQBCZyA",
  authDomain: "project-2da51.firebaseapp.com",
  projectId: "project-2da51",
  storageBucket: "project-2da51.firebasestorage.app",
  messagingSenderId: "161731090161",
  appId: "1:161731090161:web:23d81f50b8f618b42a7b50",
  measurementId: "G-8CFTW8JH1Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
