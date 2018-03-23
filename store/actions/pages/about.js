import * as actionTypes from '../../../config/store/actions/types.js';
// import { About } from '../../../pages/about.js'

export const loadedAboutPageData = (data) => {
    return {
        type: actionTypes.LOAD_ABOUT_PAGE_DATA,
        data
    };
};

export const loadingAboutPageData = (url) => {
    return {
        type: actionTypes.FETCH_ABOUT_PAGE_DATA,
        url
    };
};
