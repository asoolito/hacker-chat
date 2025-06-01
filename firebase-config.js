// Firebase konfiguratsiyasi - o'z loyihangiz ma'lumotlari bilan almashtiring
const firebaseConfig = {
  apiKey: "AIzaSyByz_qsV-EcBgnbAbOIRvD9SQD06NcWzyM",
  authDomain: "hacker-chat-4fff2.firebaseapp.com",
  projectId: "hacker-chat-4fff2",
  storageBucket: "hacker-chat-4fff2.firebasestorage.app",
  messagingSenderId: "426796888186",
  appId: "1:426796888186:web:f830147b355ceb0cae8bc3"
};

// Firebase boshlash
firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const messagesRef = db.ref('messages');

const messagesDiv = document.getElementById('messages');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

function showMessage(data) {
  const div = document.createElement('div');
  div.textContent = `${data.username}: ${data.text}`;
  div.style.textShadow = "0 0 3px #00ff00";
  div.style.whiteSpace = "pre-wrap";
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Firebase realtime data olish
messagesRef.on('child_added', snapshot => {
  showMessage(snapshot.val());
});

function sendMessage() {
  const username = usernameInput.value.trim();
  const text = messageInput.value.trim();

  if (!username) {
    alert('Iltimos, ismingizni kiriting!');
    return;
  }
  if (!text) {
    alert('Xabar bo\'sh bo\'lishi mumkin emas!');
    return;
  }

  messagesRef.push({
    username,
    text,
    timestamp: Date.now()
  });

  messageInput.value = '';
  messageInput.focus();
}

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
});
