import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyB8MkHZKMaryHhLqS2OC7NcVaGKHNfNe1A",
    authDomain: "oauth-test-d3a91.firebaseapp.com",
    projectId: "oauth-test-d3a91",
    storageBucket: "oauth-test-d3a91.appspot.com",
    messagingSenderId: "543845469345",
    appId: "1:543845469345:web:0483b6df1e29eb695174e0",
    measurementId: "G-80TMMQFYHM" 
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firebase();

export { auth, db };
export default firebase;