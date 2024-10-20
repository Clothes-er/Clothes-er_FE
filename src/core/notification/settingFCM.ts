// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsPFmql0RzXQuGZWcFy4fs9JoK9TKKZ6M",
  authDomain: "clotheser-470e0.firebaseapp.com",
  projectId: "clotheser-470e0",
  storageBucket: "clotheser-470e0.appspot.com",
  messagingSenderId: "1012775657462",
  appId: "1:1012775657462:web:2964115ecfc9adab7e31d7",
  measurementId: "G-LW9C7P8CV7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
