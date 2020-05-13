import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAiJ9Bc8vxm9aK-AU1uhaSN6FzaxFDDuTk",
    authDomain: "choreweek.firebaseapp.com",
    databaseURL: "https://choreweek.firebaseio.com",
    projectId: "choreweek",
    storageBucket: "choreweek.appspot.com",
    messagingSenderId: "923772121106",
    appId: "1:923772121106:web:be3bb69ee2cde95da968cb",
    measurementId: "G-Y008LV5E0J"
  };
  
firebase.initializeApp(firebaseConfig);

export default firebase;
