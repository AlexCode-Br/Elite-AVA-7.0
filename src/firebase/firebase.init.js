import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyByiaa41NkMJsIfqUxKr2zlb1UxJG_khoY", 
    authDomain: "sec-ba-8bd83.firebaseapp.com",
    projectId: "sec-ba-8bd83",
    storageBucket: "sec-ba-8bd83.firebasestorage.app",
    messagingSenderId: "1083493409182",
    appId: "1:1083493409182:web:6e5052aa56d23c3192b68f"
};

// Inicialização
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };