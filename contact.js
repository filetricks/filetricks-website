// Firebase SDK import (ES Module format)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Aapka Firebase Config (Step 2 se copy kiya hua)
const firebaseConfig = {
  apiKey: "AIzaSyCt4QyN_vR2EPzt8t41Qg0AXBLEKwSDJj8",
  authDomain: "filetricks-website.firebaseapp.com",
  projectId: "filetricks-website",
  storageBucket: "filetricks-website.firebasestorage.app",
  messagingSenderId: "419226493478",
  appId: "1:419226493478:web:c18d07dfd76b2fe36b3ce7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Anonymous sign-in (Firestore rules allow karne ke liye)
signInAnonymously(auth).catch((error) => {
  console.error("Auth error:", error);
});

// Form handling
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const statusText = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Page reload hone se rokna

  // Honeypot check (Agar bot ne fill kiya toh return)
  if (document.getElementById('website').value !== "") {
    return;
  }

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Button loading state
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  statusText.textContent = "";
  statusText.style.color = "var(--text)";

  try {
    // Firestore me data save karna
    await addDoc(collection(db, "messages"), {
      name: name,
      email: email,
      message: message,
      createdAt: serverTimestamp()
    });

    // Success
    statusText.textContent = "✅ Message sent successfully! We'll get back to you soon.";
    statusText.style.color = "var(--success)";
    form.reset();

  } catch (error) {
    console.error("Error:", error);
    statusText.textContent = "❌ Something went wrong. Please try again.";
    statusText.style.color = "var(--danger)";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  }
});
