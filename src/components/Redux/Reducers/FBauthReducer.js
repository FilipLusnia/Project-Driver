const initState = {
    authError: null
};

export const FBauthReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGGED_IN':
            return {
                ...state, 
                authError: null
            }
        case 'LOGIN_FAIL':
            return {
                ...state, 
                authError: action.err.message
            }


        case 'SIGNED_IN':
            return {
                ...state, 
                authError: null
            }
        case 'SIGN_FAIL':
            return {
                ...state, 
                authError: action.err.message
            }


        case 'LOGGED_OUT':
            return state;
            
        default:
            return state;

        
        case 'ACC_DELETED':
            return {
                ...state, 
                authError: null
            }
        case 'ACC_DELETE_FAIL':
            return {
                ...state, 
                authError: action.err.message
            }
    } 
}

