import * as actionTypes from '../../config/store/actions/types.js';

const initialState = {
    data: null
};

const loadAboutPageData = (state, action) => {
    const updated = {
        aboutData: action.data,
        from: 'LOADED FROM Action loadAboutPageData (fetch github)',
    };

    return { ...state, ...updated };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_ABOUT_PAGE_DATA: return loadAboutPageData(state, action);
        default: return state;
    }
};

export default reducer;