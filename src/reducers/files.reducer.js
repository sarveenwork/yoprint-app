const initialState = {
    refresh: 0,
}

const filesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_REFRESH':
            return { ...state, refresh: action.refresh }
        default:
            return state;
    }
}

export default filesReducer;