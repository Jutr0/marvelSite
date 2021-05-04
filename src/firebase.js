import { initializeApp } from "firebase/app";
import { doc, getFirestore, getDoc, collection } from "firebase/firestore";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from "firebase/auth";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyAqe1wm9R99hXRGs121wcWAEixHWkbfClk",
  authDomain: "marvelgeng-a24d2.firebaseapp.com",
  projectId: "marvelgeng-a24d2",
  storageBucket: "marvelgeng-a24d2.appspot.com",
  messagingSenderId: "1041025244999",
  appId: "1:1041025244999:web:acaf88fc964f716fef7662",
});

const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const signInWithGoogle = async () => {
  await signInWithPopup(auth, provider);
  console.log({ auth });
};
export const logout = async () => await signOut(auth);

export const db = getFirestore();

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists) {
    const [displayName, email, photoURL] = user;
    const createdAt = new Date().toISOString;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (e) {
      console.error("error: ", e);
    }
  }

  return getUserDocument(user.uid);
};


export const getUserDocument = async (uid) => {

  if(!uid) return null;
  try{
      const userDocument = await getDoc(doc(db,"users",uid))

    return {uid, ...userDocument.data()};
  }catch(e){
    console.error(e);
  }



}