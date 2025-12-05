// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5aLxGl2yn20pyLRzM1v1Bu5DVX7QOHdA",
  authDomain: "room-rent-management-app.firebaseapp.com",
  projectId: "room-rent-management-app",
  storageBucket: "room-rent-management-app.firebasestorage.app",
  messagingSenderId: "414769042612",
  appId: "1:414769042612:web:a6943f38143cfe75f0b3e1",
  measurementId: "G-0EKBRWJ0W2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
