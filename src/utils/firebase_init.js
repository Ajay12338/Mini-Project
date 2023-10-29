// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCc48Tpc9oBBc6rANeWCS1_IO_lAl4sh3Q",
  authDomain: "mini-project-5adf1.firebaseapp.com",
  projectId: "mini-project-5adf1",
  storageBucket: "mini-project-5adf1.appspot.com",
  messagingSenderId: "215095986674",
  appId: "1:215095986674:web:b4cfcf05b0650f8ec8036b",
  measurementId: "G-3KDQ2Z81XV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
