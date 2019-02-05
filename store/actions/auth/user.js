import * as actionTypes from '../../../config/store/actions/types.js';

export const userLogIn = (data = { name}) => {
    console.log("[ACTION] userLogIn ")


    const credentials = { credentials: { email: "test@test.com", password: "string"}};

    return {
        type: actionTypes.USER_LOGIN,
        data: credentials
    };
};

export const loadingAboutPageData = (url) => {
    return {
        type: actionTypes.FETCH_ABOUT_PAGE_DATA,
        url
    };
};
