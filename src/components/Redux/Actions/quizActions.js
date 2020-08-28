export const checkAnswers = (correctAnswers, answersAmount) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore();

        const currentUser = firebase.auth().currentUser;
        const userPoints = parseInt(getState().firebase.profile.points);
        const userQuizes = parseInt(getState().firebase.profile.quizes);
        const userPassedQuizes = parseInt(getState().firebase.profile.passedQuizes);
        
        if(correctAnswers === answersAmount){
            firestore.collection('users').doc(currentUser.uid).update({
                points: userPoints + 1,
                quizes: userQuizes + 1,
                passedQuizes: userPassedQuizes + 1
            })
            .then(() => dispatch({
                type: 'QUIZ_PASSED',
                correctAnswers: correctAnswers,
                answersAmount: answersAmount
            }))
        } else {
            firestore.collection('users').doc(currentUser.uid).update({
                quizes: userQuizes + 1
            })  
            .then(() => dispatch({
                type: 'QUIZ_FAILED',
                correctAnswers: correctAnswers,
                answersAmount: answersAmount
            }))
        }
    }
}