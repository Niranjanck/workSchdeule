// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
//firebase project details
apiKey: "AIzaSyB8OGkqPHDGG5TL-C5_hEY60Km8snJA_hg",

authDomain: "workschedule-4090e.firebaseapp.com",

databaseURL: "https://workschedule-4090e-default-rtdb.firebaseio.com",

projectId: "workschedule-4090e",

storageBucket: "workschedule-4090e.appspot.com",

messagingSenderId: "362158210267",

appId: "1:362158210267:web:f38f4d7820f8a4ebf320fe",

measurementId: "G-WRLYXD437P"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app)
const rDb = getDatabase(app);


export { db, auth ,rDb};
// to host firebase : https://firebase.google.com/docs/hosting/quickstart?authuser=0&hl=en
