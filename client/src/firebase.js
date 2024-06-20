// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-2fa54.firebaseapp.com",
  projectId: "mern-estate-2fa54",
  storageBucket: "mern-estate-2fa54.appspot.com",
  messagingSenderId: "1099356486399",
  appId: "1:1099356486399:web:219012761e12e5a5176aca",
  measurementId: "G-SW944FYV36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export default app