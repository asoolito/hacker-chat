// main.js
import {
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
  serverTimestamp
} from './firebase.js';

const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");
const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const messagesDiv = document.getElementById("messages");

loginBtn.onclick = () => {
  signInWithEmailAndPassword(auth, email.value, password.value).catch(err => alert(err.message));
};

registerBtn.onclick = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value).catch(err => alert(err.message));
};

logoutBtn.onclick = () => {
  signOut(auth);
};

sendBtn.onclick = async () => {
  const text = messageInput.value.trim();
  if (text) {
    await addDoc(collection(db, "messages"), {
      text,
      user: auth.currentUser.email,
      createdAt: serverTimestamp()
    });
    messageInput.value = "";
  }
};

onAuthStateChanged(auth, user => {
  if (user) {
    document.getElementById("login-box").style.display = "none";
    document.getElementById("chat-box").style.display = "block";

    const q = query(collection(db, "messages"), orderBy("createdAt"));
    onSnapshot(q, snapshot => {
      messagesDiv.innerHTML = "";
      snapshot.forEach(doc => {
        const msg = doc.data();
        const div = document.createElement("div");
        div.textContent = `${msg.user}: ${msg.text}`;
        messagesDiv.appendChild(div);
      });
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
  } else {
    document.getElementById("login-box").style.display = "block";
    document.getElementById("chat-box").style.display = "none";
  }
});
