// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLlUwcv5C7R0LNInpbzlUkdVsELscQVng",
  authDomain: "letstordb.firebaseapp.com",
  projectId: "letstordb",
  storageBucket: "letstordb.appspot.com",
  messagingSenderId: "890230851023",
  appId: "1:890230851023:web:1366fd0f49de59fcb23eba",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
