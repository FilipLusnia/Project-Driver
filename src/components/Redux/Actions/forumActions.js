export const sendComment = (text, creds) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore();

        firestore.collection('comments').add({
            name: creds.userName,
            surname: creds.userSurname,
            comment: text,
            date: new Date()
        })
        .then(() => dispatch({
            type: 'COMMENT_SEND_SUCCES'
        }))
        .catch(err => dispatch({
            type: 'COMMENT_SEND_FAIL', 
            err
        }))
    }
}

export const sendReply = (text, creds, commId) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore();

        firestore.collection('comments').doc(commId).collection('replies').add({
            name: creds.userName,
            surname: creds.userSurname,
            reply: text,
            date: new Date()
        })
        .then(() => dispatch({
            type: 'REPLY_SEND_SUCCES'
        }))
        .catch(err => dispatch({
            type: 'REPLY_SEND_FAIL', 
            err
        }))
    }
}