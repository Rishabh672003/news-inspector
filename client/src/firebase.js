import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: "news-inspector-cb555.firebaseapp.com",
  projectId: "news-inspector-cb555",
  storageBucket: "news-inspector-cb555.appspot.com",
  messagingSenderId: "104225491450",
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
