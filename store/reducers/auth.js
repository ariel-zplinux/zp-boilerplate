import * as actionTypes from '../../config/store/actions/types.js';

export const initialState = {
  data: null,
  from: null,
  user: null,
  error: null
};

const userSignedUp = (state, action) => {
  const updated = {
    user: JSON.parse(action.data),
    from: 'LOADED FROM Action userSignedUp (reducer)',
    error: null,
  };

  return {
    ...state,
    ...updated
  };
};

const userSignUpFailure = (state, action) => {
  const updated = {
    error: action.data,
    user: null
  }

  return {
    ...state,
    ...updated
  };
}

const userLoggedIn = (state, action) => {
  const updated = {
    user: action.data,
    from: 'LOADED FROM Action userLoggedIn (reducer)',
    error: null,
  };

  return {
    ...state,
    ...updated
  };
};

const userLogInFailure = (state, action) => {
  const updated = {
    error: action.data,
    user: null
  }

  return {
    ...state,
    ...updated
  };
};

const userInit = (state, action) => {
  const updated = {
    error: null,
    user: null
  }

  return {
    ...state,
    ...updated
  };
};

const userLoggedOut = (state, action) => {
  const updated = {
    error: null,
    user: null
  }

  return {
    ...state,
    ...updated
  };
};

const userLogOutFailure = (state, action) => {
  const updated = {
    error: 'log out failure',
  }

  return {
    ...state,
    ...updated
  };
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_SIGNED_UP: return userSignedUp(state, action);
    case actionTypes.USER_SIGNUP_FAILURE: return userSignUpFailure(state, action);
    case actionTypes.USER_LOGGED_IN: return userLoggedIn(state, action);
    case actionTypes.USER_LOGIN_FAILURE: return userLogInFailure(state, action);
    case actionTypes.USER_LOGGED_OUT: return userLoggedOut(state, action);
    case actionTypes.USER_LOGOUT_FAILURE: return userLogOutFailure(state, action);
    case actionTypes.USER_INIT: return userInit(state, action);
    default: return state;
  }
};

export default reducer;
