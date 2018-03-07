import * as actionTypes from '../../../config/store/actions/types.js';

export const loadAboutPageData = (data) => {
    return {
        type: actionTypes.LOAD_ABOUT_PAGE_DATA,
        data
    };
};
