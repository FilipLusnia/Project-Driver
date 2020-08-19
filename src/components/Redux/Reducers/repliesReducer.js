const initState = {
    replies: null
};

export const repliesReducer = (state = initState, action) => {
    switch(action.type){
        case 'REPLIES_FETCHED':
            return {
                ...state, 
                replies: action.replies
            }
        default:
            return state;
    } 
}
