export const getReplies = id => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore();
        const replies = [];

        firestore.collection('comments').doc(id).collection('replies').get()
        .then(resp => 
            resp.forEach(doc => 
                replies.push(doc.data())
            )
        )
        .then(() => dispatch({
            type: 'REPLIES_FETCHED',
            replies
        }))
    }
}