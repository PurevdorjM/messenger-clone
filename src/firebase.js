import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDdvjapjnE1YpQCrNYmv9sASafAoebhkDY",
    authDomain: "messenger-clone-4f6ff.firebaseapp.com",
    projectId: "messenger-clone-4f6ff",
    storageBucket: "messenger-clone-4f6ff.appspot.com",
    messagingSenderId: "478505474503",
    appId: "1:478505474503:web:13eea51621d08afbfce1e2",
    measurementId: "G-EMPY20GC4S"
});

const db = firebaseApp.firestore();

export default db;