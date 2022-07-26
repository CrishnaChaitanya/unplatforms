import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
  apiKey: "AIzaSyAyuINrgKXgqNOS_ofd5lhN_xGCEP_PjQQ",
  authDomain: "unplatforms-61ab4.firebaseapp.com",
  projectId: "unplatforms-61ab4",
  storageBucket: "unplatforms-61ab4.appspot.com",
  messagingSenderId: "15851485911",
  appId: "1:15851485911:web:1438cc425cd57c89bc8e92",
});
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
