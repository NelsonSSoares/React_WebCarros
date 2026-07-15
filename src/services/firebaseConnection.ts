
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1lx_n86VK0gBfzqV0IKeaE31sDuY1lb0",
  authDomain: "webcarros-cdeb4.firebaseapp.com",
  projectId: "webcarros-cdeb4",
  storageBucket: "webcarros-cdeb4.firebasestorage.app",
  messagingSenderId: "1065900232594",
  appId: "1:1065900232594:web:9702fcb9a7d86706577b4b",
  measurementId: "G-8R46B2Y15Z"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };