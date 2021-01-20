import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAFP_nfQIETmCwtqWw0ceFtSi3ZtCtAaHc",
    authDomain: "quizspot-8ba97.firebaseapp.com",
    projectId: "quizspot-8ba97",
    storageBucket: "quizspot-8ba97.appspot.com",
    messagingSenderId: "162153841007",
    appId: "1:162153841007:web:62526b9d4c8e734882a89a",
    measurementId: "G-CXDQW258FH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore();

