// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAgpSKFGKXMGl8wfb8R5QdoabfCxcnruCY",
    authDomain: "language-learning-game-9ef9b.firebaseapp.com",
    projectId: "language-learning-game-9ef9b",
    storageBucket: "language-learning-game-9ef9b.appspot.com",
    messagingSenderId: "576961244632",
    appId: "1:576961244632:web:fe0fcef4c297edcd4f56ad",
    measurementId: "G-5QYSD4FGWC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;