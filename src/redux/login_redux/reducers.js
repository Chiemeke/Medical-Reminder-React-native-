import { SET_AGE,SET_NAME } from './actions';

const initialState = {
    name: "",
    age: 0
}

function loginReducer(state = initialState, action) {
    switch (action.type) {
        case SET_NAME:
            return { ...state, name: action.payload };
            case SET_AGE:
                return { ...state, age: action.payload };
        default:
            return state;
    }
}


export default loginReducer;