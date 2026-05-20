  import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

// Optional analytics
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAosljDdIYcZ6pDprbP6cQ23JvJID0ks58",

  authDomain: "taskmaster-pro-2.firebaseapp.com",

  projectId: "taskmaster-pro-2",

  storageBucket:
    "taskmaster-pro-2.firebasestorage.app",

  messagingSenderId: "683097912105",

  appId:
    "1:683097912105:web:a307fd4f2b56d86a52bd38",

  measurementId: "G-KDDT8W1TQC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);

export const db = getFirestore(app);

// ✅ ADD THIS
export const storage = getStorage(app);

// Optional analytics
export const analytics =
  getAnalytics(app);

export default app;