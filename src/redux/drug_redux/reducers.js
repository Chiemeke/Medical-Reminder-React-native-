import { SET_DRUGS, SET_DRUG_ID } from './actions';

const initialState = {
    drugs: [],
    drugID: 0,
}

function drugReducer(state = initialState, action) {
    switch (action.type) {
        case SET_DRUGS:
            return { ...state, drugs: action.payload };
        case SET_DRUG_ID:
            return { ...state, drugID: action.payload };
        default:
            return state;
    }
}


export default drugReducer;