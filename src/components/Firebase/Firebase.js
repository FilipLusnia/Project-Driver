import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'
import React from 'react';

const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
};

export default class Firebase extends React.Component{

  constructor(props){
    super(props);
    
    firebase.initializeApp(config);

    this.fbauth = firebase.auth();
    this.fbdatabase = firebase.database();
  }

  signUpWithEmailAndPass = (email, password) =>
    this.fbauth.createUserWithEmailAndPassword(email, password);

  signInWithEmailAndPass = (email, password) =>
    this.fbauth.signInWithEmailAndPassword(email, password);

  signOut = () => 
    this.fbauth.signOut();
}

