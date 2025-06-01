// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase config (o'zingizning config'ingizni yozing)
const firebaseConfig = {
  apiKey: "AIzaSyByz_qsV-EcBgnbAbOIRvD9SQD06NcWzyM",
  authDomain: "hacker-chat-4fff2.firebaseapp.com",
  projectId: "hacker-chat-4fff2",
  storageBucket: "hacker-chat-4fff2.appspot.com",
  messagingSenderId: "426796888186",
  appId: "1:426796888186:web:f830147b355ceb0cae8bc3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  db,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  getDoc,
  setDoc,
};
