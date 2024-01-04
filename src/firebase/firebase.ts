import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBpc3nATqP9lO2qSfvaD1_sDBX6DxrBtbI",
  authDomain: "nwitter-reloaded-e50ad.firebaseapp.com",
  projectId: "nwitter-reloaded-e50ad",
  storageBucket: "nwitter-reloaded-e50ad.appspot.com",
  messagingSenderId: "639543535942",
  appId: "1:639543535942:web:f11e897bb05706c1219d47",
  measurementId: "G-P8159Q87XH"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);