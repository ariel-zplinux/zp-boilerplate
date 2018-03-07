import * as actionTypes from '../../../config/store/actions/types.js';

const initialState = {
    pages: {
        about: {
            data: null
        }
    }
};

const loadAboutPageData = (state, action) => {
    const updated = {
        pages: {
            about: {
                data: action.data
            }
        }
    }

    return { ...state, ...updated };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_ABOUT_PAGE_DATA: return loadAboutPageData(state, action);
        default: return state;
    }
};

export default reducer;