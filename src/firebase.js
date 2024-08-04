// Import functions from the Firebase SDKs
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAReBcM4NFFB75Cvn8o0-56Q5TCoMeZQZk',
  authDomain: 'movie-database-bff64.firebaseapp.com',
  projectId: 'movie-database-bff64',
  storageBucket: 'movie-database-bff64.appspot.com',
  messagingSenderId: '689021390450',
  appId: '1:689021390450:web:4e00601426c485cd293ceb',
  measurementId: 'G-4QXPX6TQWR'
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get Firestore and Auth instances
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

// Export Auth and Firestore instances
export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword };
