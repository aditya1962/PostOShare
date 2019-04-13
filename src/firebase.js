/* eslint-disable */
import * as firebase from 'firebase/app';
import 'firebase/database';

var config = {
    apiKey: "AIzaSyC0x7BDINL1BvNA_sKWK7Zr4YojFdePEik",
    authDomain: "social-media-post.firebaseapp.com",
    databaseURL: "https://social-media-post.firebaseio.com",
    projectId: "social-media-post",
    storageBucket: "social-media-post.appspot.com",
    messagingSenderId: "136183787820"
  };
  

  var db = firebase.initializeApp(config);

  export default db;