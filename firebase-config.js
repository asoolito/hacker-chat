import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase konfiguratsiyasi
const firebaseConfig = {
  apiKey: "AIzaSyByz_qsV-EcBgnbAbOIRvD9SQD06NcWzyM",
  authDomain: "hacker-chat-4fff2.firebaseapp.com",
  projectId: "hacker-chat-4fff2",
  storageBucket: "hacker-chat-4fff2.firebasestorage.app",
  messagingSenderId: "426796888186",
  appId: "1:426796888186:web:f830147b355ceb0cae8bc3"
};

// Firebase ilovasini ishga tushirish
const app = initializeApp(firebaseConfig);

// Firestore ma'lumotlar bazasini olish
const db = getFirestore(app);

const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");

// "messages" kolleksiyasiga ulanish
const messagesRef = collection(db, "messages");

// Xabarlarni vaqt tartibida olish uchun query
const q = query(messagesRef, orderBy("createdAt", "asc"));

// Real vaqt rejimida xabarlarni olish va ko'rsatish
onSnapshot(q, (querySnapshot) => {
  chatBox.innerHTML = "";
  querySnapshot.forEach((doc) => {
    const message = doc.data();
    const msgElem = document.createElement("div");
    msgElem.classList.add("message");
    msgElem.textContent = message.text;
    chatBox.appendChild(msgElem);
  });
  chatBox.scrollTop = chatBox.scrollHeight; // pastga scroll
});

// Xabar yuborish funksiyasi
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (text === "") return;

  try {
    await addDoc(messagesRef, {
      text: text,
      createdAt: serverTimestamp()
    });
    messageInput.value = "";
  } catch (error) {
    console.error("Xabar yuborishda xatolik:", error);
  }
});
