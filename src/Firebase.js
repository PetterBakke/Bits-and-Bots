// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWhY-UXyBKuUKUTBTDtYWuB5K8NYJQDqk",
  authDomain: "bits-90af5.firebaseapp.com",
  projectId: "bits-90af5",
  storageBucket: "bits-90af5.appspot.com",
  messagingSenderId: "434184125061",
  appId: "1:434184125061:web:2d4ab8c021f2e20d6787ec"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();