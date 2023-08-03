export const SET_DRUGS = 'SET_DRUGS';
export const SET_DRUG_ID = 'SET_DRUG_ID';

export const setDrugs = drugs => dispatch => {
    dispatch({
        type: SET_DRUGS,
        payload: drugs,
    });
};

export const setDrugID = drugID => dispatch => {
    dispatch({
        type: SET_DRUG_ID,
        payload: drugID,
    });
};
