// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8iETqRypO3YdDioWatOVoeVewu_EX84c",
  authDomain: "fraudlens-58636.firebaseapp.com",
  projectId: "fraudlens-58636",
  storageBucket: "fraudlens-58636.firebasestorage.app",
  messagingSenderId: "514886602394",
  appId: "1:514886602394:web:d3067438c05d5e2a195923",
  measurementId: "G-J2GNWJHCPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export auth for use in components
export const auth = getAuth(app);