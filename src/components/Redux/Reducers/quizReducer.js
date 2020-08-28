const initState = {
    correctAnswers: null,
    answersAmount: null,
    quizPassed: null
};

export const quizReducer = (state = initState, action) => {
    switch(action.type){
        case 'QUIZ_PASSED':
            return {
                ...state, 
                correctAnswers: action.correctAnswers,
                answersAmount: action.answersAmount,
                quizPassed: true
            }
        case 'QUIZ_FAILED':
            return {
                ...state, 
                correctAnswers: action.correctAnswers,
                answersAmount: action.answersAmount,
                quizPassed: false
            }
        default:
            return state;
    } 
}
