import * as actionTypes from '../../../config/store/actions/types.js';

export const userSignUp = (credentials) => {
  const action = {
    type: actionTypes.USER_SIGNUP,
    data: { credentials }
  };

  return action;
};

export const userSignedUp = (data) => {
  const action = {
    type: actionTypes.USER_SIGNED_UP,
    data
  };

  return action;
};

export const userLogIn = (data = { name}) => {
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
