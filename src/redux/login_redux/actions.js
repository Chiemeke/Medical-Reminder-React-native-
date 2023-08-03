export const SET_NAME = 'SET_NAME';
export const SET_AGE = 'SET_AGE';



export const setName = name => dispatch => {
    dispatch({
        type: SET_NAME,
        payload: name,
    });
};

export const setAge = age => dispatch => {
    dispatch({
        type: SET_AGE,
        payload: age,
    });
};


