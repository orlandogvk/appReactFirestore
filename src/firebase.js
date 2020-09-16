import firebase from 'firebase/app'; 
import 'firebase/firestore';
 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyDtYnornx3gQdLWJWjMHYPX14kLQ2IwQEA",
    authDomain: "fb-crud-react-a053e.firebaseapp.com",
    databaseURL: "https://fb-crud-react-a053e.firebaseio.com",
    projectId: "fb-crud-react-a053e",
    storageBucket: "fb-crud-react-a053e.appspot.com",
    messagingSenderId: "559610728549",
    appId: "1:559610728549:web:c336499faf33f2c864f68c"
  };
  // Initialize Firebase

  const fb=firebase.initializeApp(firebaseConfig);
  export const db=fb.firestore();

  