import { combineReducers } from 'redux';

import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import {FBauthReducer} from './FBauthReducer';
import {pointsReducer} from './pointsReducer';

export default combineReducers({
    FBauthReducer,
    pointsReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});