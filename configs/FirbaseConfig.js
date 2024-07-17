// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "process.env.FIREBASE_API_KEY",
  authDomain: "biznexus-99402.firebaseapp.com",
  projectId: "biznexus-99402",
  storageBucket: "biznexus-99402.appspot.com",
  messagingSenderId: "187035515769",
  appId: "1:187035515769:web:45b8e7285bcd4f58ad4da8",
  measurementId: "G-2ZV189Z9XN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);