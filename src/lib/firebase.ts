// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARVR9liOWK8MgnrCZadJKfIeaPXJN5G7A",
  authDomain: "front-end-fakestore.firebaseapp.com",
  projectId: "front-end-fakestore",
  storageBucket: "front-end-fakestore.firebasestorage.app",
  messagingSenderId: "916602576095",
  appId: "1:916602576095:web:d55eb6a9e6d3951cad9d6a",
  measurementId: "G-PJ0B99LX18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)