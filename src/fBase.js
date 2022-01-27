// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import "firebase/compat/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBSNuox8qBqMz9UmriFEp11SRfSi9mpIEc",
  authDomain: "jwitter-cf38c.firebaseapp.com",
  projectId: "jwitter-cf38c",
  storageBucket: "jwitter-cf38c.appspot.com",
  messagingSenderId: "791357863719",
  appId: "1:791357863719:web:780faf8b8dafbe89f31b02",
};

const firebaseApp = initializeApp(firebaseConfig);
export const authService = getAuth(firebaseApp);
export const dbService = getFirestore();
export const storageService = getStorage();
