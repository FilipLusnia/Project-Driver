const initState = {
    points: 0
};

export const pointsReducer = (state = initState, action) => {
    switch(action.type){
        case 'POINTS_INCREASED':
            return {
                ...state
            }
        default:
            return state;
    } 
}

