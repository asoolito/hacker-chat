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
  apiKey: "SIZNING_API_KEY",
  authDomain: "SIZNING_PROJECT.firebaseapp.com",
  projectId: "SIZNING_PROJECT",
  storageBucket: "SIZNING_PROJECT.appspot.com",
  messagingSenderId: "SIZNING_MESSAGING_SENDER_ID",
  appId: "SIZNING_APP_ID"
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
