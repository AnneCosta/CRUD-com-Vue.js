import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyAz98EuYpMN7vX6CgOh6YNDBbsEKIwjWjk",
    authDomain: "crud-vue-4e470.firebaseapp.com",
    databaseURL: "https://crud-vue-4e470.firebaseio.com",
    projectId: "crud-vue-4e470",
    storageBucket: "crud-vue-4e470.appspot.com",
    messagingSenderId: "346353484914",
    appId: "1:346353484914:web:8b5c30c65b14097b386eeb",
    measurementId: "G-066T42NZ4M"
};


export const db = firebase.initializeApp(config);