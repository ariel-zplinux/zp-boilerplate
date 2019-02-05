import * as actionTypes from '../../config/store/actions/types.js';

const initialState = {
    data: null,
    from: null,
    user: null
};

const userLoggedIn = (state, action) => {
    const updated = {
        user: action.data,
        from: 'LOADED FROM Action userLoggedIn (reducer)',
    };

    return { ...state, ...updated };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_ABOUT_PAGE_DATA: return loadAboutPageData(state, action);
        case actionTypes.USER_LOGIN: return userLoggedIn(state, action);
        default: return state;
    }
};

export default reducer;
