import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "******",
    authDomain: "*****.firebaseapp.com",
    databaseURL: "https://*****.firebaseio.com",
    projectId: "*****",
    storageBucket: "*****.appspot.com",
    messagingSenderId: "*******",
    appId: "*******",
    measurementId: "*****"
};


<<<<<<< HEAD
export const db = firebase.initializeApp(config);
=======
export const db = firebase.initializeApp();
>>>>>>> master
