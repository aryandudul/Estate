// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-estate-be205.firebaseapp.com",
  projectId: "mern-estate-be205",
  storageBucket: "mern-estate-be205.appspot.com",
  messagingSenderId: "51510880750",
  appId: "1:51510880750:web:3c5f82c48d3cba8fca86ff"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);