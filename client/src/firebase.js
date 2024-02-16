import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAIeB7HyKAY4MGNmc6QZHsxsAqPeq1mcYA",
  authDomain: "astro-fire-69.firebaseapp.com",
  projectId: "astro-fire-69",
  storageBucket: "astro-fire-69.appspot.com",
  messagingSenderId: "503989480152",
  appId: import.meta.env.FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
