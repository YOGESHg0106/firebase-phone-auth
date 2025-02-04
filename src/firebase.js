import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

// Your Firebase config object (replace with your own)
const firebaseConfig = {
  apiKey: "AIzaSyA32wWy5IITNJd-JGQUOLdnyPhbDdDoQ3k",
  authDomain: "phone-auth-react-f9d02.firebaseapp.com",
  projectId: "phone-auth-react-f9d02",
  storageBucket: "phone-auth-react-f9d02.firebasestorage.app",
  messagingSenderId: "119661098917",
  appId: "1:119661098917:web:99273abacfd4a1b5a19a4c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
