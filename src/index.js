import * as serviceWorker from './serviceWorker';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider, useSelector } from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from './components/Redux/Reducers';
import thunk from 'redux-thunk';
import { createFirestoreInstance } from "redux-firestore";
import { 
  ReactReduxFirebaseProvider, 
  getFirebase, 
  isLoaded 
} from "react-redux-firebase";

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

import './scss/main.scss';
import Loader from 'react-loader-spinner';

import App from './components/App';

const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
};

firebase.initializeApp(config);
firebase.firestore();

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk.withExtraArgument({ getFirebase })))
);

const rrfProps = {
  firebase,
  config: {
    useFirestoreForProfile: true,
    userProfile: 'users'
  },
  dispatch: store.dispatch,
  createFirestoreInstance
}

function AuthIsLoaded({ children }) {
  const fbauth = useSelector(state => state.firebase.auth);
  const fbprofile = useSelector(state => state.firebase.profile);
  
  if (!isLoaded(fbauth && fbprofile)){ 
    return (
      <div className="splash_screen">
        <div className="nav_logo_text">PROJECT: <br/> <span>_DRIVER</span></div>
        <Loader
          type="Circles"
          color="#5365ff"
          height={80}
        />
      </div>
    )
  }
  return children
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <App/>
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>
 , document.getElementById('root')
);

serviceWorker.unregister();
