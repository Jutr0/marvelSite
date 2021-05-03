import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyAqe1wm9R99hXRGs121wcWAEixHWkbfClk",
  authDomain: "marvelgeng-a24d2.firebaseapp.com",
  projectId: "marvelgeng-a24d2",
  storageBucket: "marvelgeng-a24d2.appspot.com",
  messagingSenderId: "1041025244999",
  appId: "1:1041025244999:web:acaf88fc964f716fef7662",
});

export const db = getFirestore();

