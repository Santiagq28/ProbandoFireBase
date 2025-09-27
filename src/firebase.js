// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpgwCjPV7X6_cHp4jYB_kp1RHfPQVH8DI",
  authDomain: "projectexample28.firebaseapp.com",
  projectId: "projectexample28",
  storageBucket: "projectexample28.firebasestorage.app",
  messagingSenderId: "754822783054",
  appId: "1:754822783054:web:32934a2c42e422123a231f",
  measurementId: "G-HV6E971R95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Variable para obtener funcionalidad de autenticación
const auth = getAuth(app);
const GoogleProvider = new GoogleAuthProvider();

// Conexión a db
const db = getFirestore(app);

// Exportar variables para consumo del proyecto
export { auth, GoogleProvider, db, signOut };   