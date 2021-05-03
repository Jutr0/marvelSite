import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqe1wm9R99hXRGs121wcWAEixHWkbfClk",
  authDomain: "marvelgeng-a24d2.firebaseapp.com",
  projectId: "marvelgeng-a24d2",
  storageBucket: "marvelgeng-a24d2.appspot.com",
  messagingSenderId: "1041025244999",
  appId: "1:1041025244999:web:acaf88fc964f716fef7662",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

window.firebase = firebase;

export default firebase;
