// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM4EqyKSofZ2_m9ErdAyOV-Ubjt5hEcdw",
  authDomain: "movoai.firebaseapp.com",
  projectId: "movoai",
  storageBucket: "movoai.appspot.com",
  messagingSenderId: "483472258193",
  appId: "1:483472258193:web:d6c04f4a67a6bb363a7b30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}