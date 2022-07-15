import { ADD_TO_WATCHLIST, GET_ALL_WATCHLIST, REMOVE_FROM_WATCHLIST } from './types';

const symbolReducer = (state = [], action: any) => {
    switch (action.type) {
        case ADD_TO_WATCHLIST:
            return [...state, action.payload];
        case REMOVE_FROM_WATCHLIST:
            return state.filter((symbol) => symbol !== action.payload);
        case GET_ALL_WATCHLIST:
            return state;
        default:
            return state;
    }
};

export default symbolReducer;