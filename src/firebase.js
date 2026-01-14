import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCvDOWUS6fbPkhYqd6D4aSdpNetehVg_qg",
    authDomain: "edupassport-c40d5.firebaseapp.com",
    projectId: "edupassport-c40d5",
    storageBucket: "edupassport-c40d5.firebasestorage.app",
    messagingSenderId: "424048567254",
    appId: "1:424048567254:web:3853c00a77a2060a8e3a77",
    measurementId: "G-JYGCFP6YK6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

