import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhLaxieoQnYhCRkr-ZQJkIhIQJavPT0_A",
  authDomain: "tourist-help-7fc83.firebaseapp.com",
  projectId: "tourist-help-7fc83",
  storageBucket: "tourist-help-7fc83.appspot.com",
  messagingSenderId: "949771252720",
  appId: "1:949771252720:web:77c5edf133bed0e3476335",
  measurementId: "G-7J82178RRD"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app