// Firebase import va konfiguratsiya
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase project config (o'zingizning project ma'lumotlari bilan to'ldirilgan bo'lishi kerak)
const firebaseConfig = {
  apiKey: "AIzaSyByz_qsV-EcBgnbAbOIRvD9SQD06NcWzyM",
  authDomain: "hacker-chat-4fff2.firebaseapp.com",
  projectId: "hacker-chat-4fff2",
  storageBucket: "hacker-chat-4fff2.appspot.com",
  messagingSenderId: "426796888186",
  appId: "1:426796888186:web:f830147b355ceb0cae8bc3"
};

// Firebase'ni ishga tushirish
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportlar
export {
  db,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
};
