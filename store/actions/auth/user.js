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

export const userLogIn = ({ credentials}) => {
  const action = {
      type: actionTypes.USER_LOGIN,
      data: credentials
  };

  return action;
};

export const userLoggedIn = (data) => {
  const action = {
    type: actionTypes.USER_LOGGED_IN,
    data
  };

  return action;
};

export const userLogInFailure = (data = { error: 'error'}) => {
  const action = {
    type: actionTypes.USER_LOGIN_FAILURE,
    data
  };

  return action;
};

export const userInit = () => {
  const action = {
    type: actionTypes.USER_INIT
  };

  return action;
};

export const userLogOut = (data) => {
  const action = {
      type: actionTypes.USER_LOGOUT,
      data
  };

  return action;
};

export const userLoggedOut = () => {
  const action = {
    type: actionTypes.USER_LOGGED_OUT,
  };

  return action;
};

export const userLogOutFailure = (data = { error: 'error'}) => {
  const action = {
    type: actionTypes.USER_LOGOUT_FAILURE,
    data
  };

  return action;
};
