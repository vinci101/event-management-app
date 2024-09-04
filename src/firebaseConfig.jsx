import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "event-management-d3ca1.firebaseapp.com",
  projectId: "event-management-d3ca1",
  storageBucket: "event-management-d3ca1.appspot.com",
  messagingSenderId: "997298991809",
  appId: "1:997298991809:web:8ba115d91e47b3e976da40",
  measurementId: "G-D4WF5BLZVN",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
