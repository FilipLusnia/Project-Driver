import { combineReducers } from 'redux';

import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import {FBauthReducer} from './FBauthReducer';

export default combineReducers({
    FBauthReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});