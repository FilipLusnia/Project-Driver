import { combineReducers } from 'redux';

import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import {FBauthReducer} from './FBauthReducer';
import {forumReducer} from './forumReducer';

export default combineReducers({
    FBauthReducer,
    forumReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});