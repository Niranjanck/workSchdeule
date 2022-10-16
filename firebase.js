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
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app)
const rDb = getDatabase(app);


export { db, auth ,rDb};
// to host firebase : https://firebase.google.com/docs/hosting/quickstart?authuser=0&hl=en
