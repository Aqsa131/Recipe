import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,

} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCkdudBjJ-qrwatqI_hBEkpSToA47qSwGc",
    authDomain: "recipe-app-eeceb.firebaseapp.com",
    projectId: "recipe-app-eeceb",
    storageBucket: "recipe-app-eeceb.firebasestorage.app",
    messagingSenderId: "833128801256",
    appId: "1:833128801256:web:1cdc97d38d81634048fa5d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

export {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
}