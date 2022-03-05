import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAz5GCdE89HXiLDp8GT06fXVATXeHHPho8",
    authDomain: "pm-dojo.firebaseapp.com",
    projectId: "pm-dojo",
    storageBucket: "pm-dojo.appspot.com",
    messagingSenderId: "410153820981",
    appId: "1:410153820981:web:27eb11c3b9acdc161e227c"
};

// init firebase, application
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp }
