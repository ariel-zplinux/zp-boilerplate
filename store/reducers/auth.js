import * as actionTypes from '../../config/store/actions/types.js';
import { userSignUp } from '../actions/auth/user.js';

export const initialState = {
  data: null,
  from: null,
  user: null,
  error: null,
  modalFormAuth: false
};

const userLoggedIn = (state, action) => {
  const updated = {
    user: action.data,
    from: 'LOADED FROM Action userLoggedIn (reducer)',
  };

  return { ...state, ...updated };
};

const userSignedUp = (state, action) => {
  const updated = {
    user: JSON.parse(action.data),
    from: 'LOADED FROM Action userLoggedIn (reducer)',
    error: null,
    modalFormAuth: false
  };

  return {
    ...state,
    ...updated
  };
};

const userSignUpFailure = (state, action) => {
  const updated = {
    error: action.data,
    modalFormAuth: true
  }

  return {
    ...state,
    ...updated
  };
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN: return userLoggedIn(state, action);
    case actionTypes.USER_SIGNED_UP: return userSignedUp(state, action);
    case actionTypes.USER_SIGNUP_FAILURE: return userSignUpFailure(state, action);
    default: return state;
  }
};

export default reducer;
