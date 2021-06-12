import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyBek52EGDWF7YEakz_aB-6SSpjjavA1_7s",
  authDomain: "my-cal-76221.firebaseapp.com",
  projectId: "my-cal-76221",
  storageBucket: "my-cal-76221.appspot.com",
  messagingSenderId: "925326808080",
  appId: "1:925326808080:web:3f0f75a9b2c8da6b6b6695"
};


firebase.initializeApp(config);
const db = firebase.firestore();
export default db;