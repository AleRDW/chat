import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBM3GC0sSTaqPxf5__pnYIQhwjCw6DupJA",
  authDomain: "chat-firebase-7e3f4.firebaseapp.com",
  projectId: "chat-firebase-7e3f4",
  storageBucket: "chat-firebase-7e3f4.firebasestorage.app",
  messagingSenderId: "1096844213751",
  appId: "1:1096844213751:web:497b81caad070842d6c2f2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
