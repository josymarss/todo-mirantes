// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBCB87tiWvGrt0pHse_n6nXrWuubeCZv8",
  authDomain: "todo-mirantes.firebaseapp.com",
  projectId: "todo-mirantes",
  storageBucket: "todo-mirantes.appspot.com",
  messagingSenderId: "113713761267",
  appId: "1:113713761267:web:a5a928ed91a6e4ba74e086",
  measurementId: "G-GDHHGCH2WQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireStore = getFirestore(app);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);


export { fireStore  };