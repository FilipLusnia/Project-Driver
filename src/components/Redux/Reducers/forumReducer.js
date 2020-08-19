const initState = {
    forumError: null
};

export const forumReducer = (state = initState, action) => {
    switch(action.type){
        case 'REPLY_SEND_FAIL':
            return {
                ...state, 
                forumError: action.err
            }
        case 'COMMENT_SEND_FAIL':
            return {
                ...state, 
                forumError: action.err
            }
            
        default:
            return state;
    } 
}

