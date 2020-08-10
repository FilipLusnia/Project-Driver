export const addPoints = pointsAmount => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore();
        const currentUser = firebase.auth().currentUser;

        firestore.collection('users').doc(currentUser.uid).update({
            points: getState().pointsReducer.points + pointsAmount
        })
        .then(() => firestore.collection('users').doc(currentUser.uid).get())
        .then(aquiredDoc => dispatch({
            type: 'POINTS_INCREASED'
        }))
    }
}