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
                surname: creds.surnameVal,
                points: 0
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

export const deleteAcc = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore();
        const currentUser = firebase.auth().currentUser;

        firestore.collection('users').doc(currentUser.uid).delete()
        .then(firebase.auth().currentUser.delete())
        .then(signOut())
        .then(() => dispatch({
            type: 'ACC_DELETED'
        }))
        .catch(err => dispatch({
            type: 'ACC_DELETE_FAIL', 
            err
        }))
    }
}
