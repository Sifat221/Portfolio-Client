import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyClEYFnpPHhNLK_V3P-dZzZwSWMIpWMmZk",
  authDomain: "sifat-khan-joy.firebaseapp.com",
  projectId: "sifat-khan-joy",
  storageBucket: "sifat-khan-joy.firebasestorage.app",
  messagingSenderId: "931960593210",
  appId: "1:931960593210:web:e64fa7fcb0e550361b0e03",
  measurementId: "G-0T30REJ8V1"
};

export const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
