import * as actionTypes from '../../../config/store/actions/types.js';

export const loadedAboutPageData = (data) => {
    console.log("[ACTION] loadedAboutPageData ")

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
