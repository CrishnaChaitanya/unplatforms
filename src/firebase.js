import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
  apiKey: "AIzaSyD7l8KHzUPYunuTpwnr6BOEn6d5HXobWrQ",
  authDomain: "unplat-59c29.firebaseapp.com",
  projectId: "unplat-59c29",
  storageBucket: "unplat-59c29.appspot.com",
  messagingSenderId: "1057710896268",
  appId: "1:1057710896268:web:b89a9f412f33506efff7a9",
});
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
