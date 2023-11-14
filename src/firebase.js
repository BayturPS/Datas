import firebase from "firebase/compat/app";
import "firebase/compat/database";

var firebaseConfig = {
  apiKey: "AIzaSyBzuGv65KKRVHVXnJhYAPlFCKvRqbhrTXM",
  authDomain: "movie-list-103b8.firebaseapp.com",
  databaseURL: "https://list-func-default-rtdb.firebaseio.com/",
  projectId: "movie-list-103b8",
  storageBucket: "list-func-default-rtdb.firebaseio.com/",
  messagingSenderId: "550642297269",
  appId: "1:550642297269:web:7104a9c4487cae568851fc",
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
