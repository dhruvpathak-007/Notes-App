// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFXynW-H5eRKvrpFECQNrmtIpYXb4rJ-c",
  authDomain: "notes-app-7b6bf.firebaseapp.com",
  projectId: "notes-app-7b6bf",
  storageBucket: "notes-app-7b6bf.appspot.com",
  messagingSenderId: "1030206260891",
  appId: "1:1030206260891:web:412d5a4f08e4bcd9c3283e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
