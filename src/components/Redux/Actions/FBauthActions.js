export const signIn = creds => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            creds.emailVal,
            creds.passwordVal
        )
        .then(() => dispatch({
            type: 'LOGGED_IN'
        }))
        .catch(err => dispatch({
            type: 'LOGIN_FAIL', 
            err
        }))
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut()
        .then(() => dispatch({
            type: 'LOGGED_OUT'
        }))
    }
}

export const signUp = creds => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore();

        firebase.auth().createUserWithEmailAndPassword(
            creds.emailVal,
            creds.passwordVal
        )
        .then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                name: creds.nameVal,
                surname: creds.surnameVal
            })
        })
        .then(() => dispatch({
            type: 'SIGNED_IN'
        }))
        .catch(err => dispatch({
            type: 'SIGN_FAIL', 
            err
        }))
    }
}
