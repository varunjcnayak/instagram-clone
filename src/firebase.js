 import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBVBhSKqY7URnHWa7eLU2Ota7EWn3IsdH0",
    authDomain: "instagram-clone-react1-87a50.firebaseapp.com",
    projectId: "instagram-clone-react1-87a50",
    storageBucket: "instagram-clone-react1-87a50.appspot.com",
    messagingSenderId: "176853211927",
    appId: "1:176853211927:web:1cac863ef615526f317552",
    measurementId: "G-MGLE02T9WG"
  });
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage };