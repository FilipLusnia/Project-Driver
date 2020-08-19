export const sendComment = (text, name) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore();

        firestore.collection('comments').add({
            name: name,
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

export const sendReply = (text, name, commId) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore();

        firestore.collection('comments').doc(commId).collection('replies').add({
            name: name,
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