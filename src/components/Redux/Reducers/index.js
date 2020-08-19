import { combineReducers } from 'redux';

import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import {FBauthReducer} from './FBauthReducer';
import {pointsReducer} from './pointsReducer';
import {repliesReducer} from './repliesReducer';
export default combineReducers({
    FBauthReducer,
    repliesReducer,
    pointsReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});