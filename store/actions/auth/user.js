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

export const userSignUpFailure = (data = { error: 'error'}) => {
  const action = {
    type: actionTypes.USER_SIGNUP_FAILURE,
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
