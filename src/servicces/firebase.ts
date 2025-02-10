// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASZSWBGwPJYuQDRi1GObaNtrccuaBfu70",
  authDomain: "bgmultiservices-781c8.firebaseapp.com",
  projectId: "bgmultiservices-781c8",
  // storageBucket: "bgmultiservices-781c8.firebasestorage.app",
  messagingSenderId: "749311417727",
  appId: "1:749311417727:web:3ea8698ba8ac3ac7ac8e4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialisation de Firestore
const db = getFirestore(app);

export { db };