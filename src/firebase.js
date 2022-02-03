import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({

    apiKey: "AIzaSyA2YSV8shugbDkeLtXzPzZQ80OfQ1NXEOQ",
    authDomain: "chatapp-23182.firebaseapp.com",
    projectId: "chatapp-23182",
    storageBucket: "chatapp-23182.appspot.com",
    messagingSenderId: "323113986428",
    appId: "1:323113986428:web:0abb957f115b2407cf9cf9",
    measurementId: "G-2GYEJ0828K"
}).auth();