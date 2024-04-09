// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "paperpro-f307d.firebaseapp.com",
  projectId: import.meta.env.PROJECT_ID,
  storageBucket: "paperpro-f307d.appspot.com",
  messagingSenderId: import.meta.env.MESSAGING_SENDER_ID,
  appId: import.meta.env.APP_ID

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app