import { combineReducers } from 'redux';

import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import {FBauthReducer} from './FBauthReducer';
import {forumReducer} from './forumReducer';
import {quizReducer} from './quizReducer';

export default combineReducers({
    FBauthReducer,
    forumReducer,
    quizReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});