// services/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDGfKhsSiO3hsPBR-Jk-pheCoQR6vrCYzU",
  authDomain: "ps2-collection.firebaseapp.com",
  projectId: "ps2-collection",
  storageBucket: "ps2-collection.firebasestorage.app",
  messagingSenderId: "1086781562833",
  appId: "1:1086781562833:web:4c30ac11d0d8f3cc2f8af0",
  measurementId: "G-P06KZM0Z87"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);