import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "exclusive-ecommerce-store.firebaseapp.com",
  projectId: "exclusive-ecommerce-store",
  storageBucket: "exclusive-ecommerce-store.firebasestorage.app",
  messagingSenderId: "10389897032",
  appId: "1:10389897032:web:e14cc482812c6c3084fd7d",
};

export const app = initializeApp(firebaseConfig);
