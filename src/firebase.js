import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjzBWeIh2G343wQgoCgSyNmgQzzmB2Vd8",
  authDomain: "chatapp-cf58a.firebaseapp.com",
  projectId: "chatapp-cf58a",
  storageBucket: "chatapp-cf58a.appspot.com",
  messagingSenderId: "1095785130422",
  appId: "1:1095785130422:web:5c169ac13fc44c4f9b7917"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication
export const auth = getAuth(app);
export const storage = getStorage();
export const db  = getFirestore();

