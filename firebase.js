import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import dotenv from "dotenv";
dotenv.config();
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "grocery-store-497ba.firebaseapp.com",
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: "grocery-store-497ba.appspot.com",
    messagingSenderId: "469218615618",
    appId: "1:469218615618:web:4482a88637077a003e28db",
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
