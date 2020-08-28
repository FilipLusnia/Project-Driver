export const updateLevel = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore();

        const currentUser = firebase.auth().currentUser;
        const userLevel = parseInt(getState().firebase.profile.level);
        const userPoints = parseInt(getState().firebase.profile.points);
        const userPointsToNext = parseInt(getState().firebase.profile.pointsToNext);

        let levels = [];
        let level = userLevel;
        let pointsToNext = userPointsToNext;

        firestore.collection('levels').doc('levels').get()
        .then(e => {

            levels = e.data().levels
        
            levels.forEach((v, i) => {
                if(userPoints >= v){
                    level = i++;
                }
            })

            if(level < (levels.length - 1)){
                pointsToNext = levels[level+1] - userPoints;
            } else if (level >= (levels.length - 1)){
                pointsToNext = 0;
            }

            firestore.collection('users').doc(currentUser.uid).update({
                level: level,
                pointsToNext: pointsToNext
            })
        })
    }
}