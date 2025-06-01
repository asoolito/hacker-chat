// auth.js
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "./firebase.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Ro‘yxatdan o‘tish muvaffaqiyatli!");
  } catch (error) {
    alert("Xato: " + error.message);
  }
});

loginBtn.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Tizimga kirdingiz!");
    window.location.href = "chat.html";
  } catch (error) {
    alert("Xato: " + error.message);
  }
});
