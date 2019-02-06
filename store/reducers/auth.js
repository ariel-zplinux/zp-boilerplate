import * as actionTypes from '../../config/store/actions/types.js';
import { userSignUp } from '../actions/auth/user.js';

const initialState = {
    data: null,
    from: null,
    user: null
};

const userLoggedIn = (state, action) => {
    const updated = {
        user: action.data,
        from: 'LOADED FROM Action userLoggedIn (reducer)',
    };

    return { ...state, ...updated };
};

const userSignedUp = (state, action) => {
  console.log('== reducer')
  console.log({action})
  const updated = {
      user: action.data,
      from: 'LOADED FROM Action userLoggedIn (reducer)',
  };

  return { ...state, ...updated };
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN: return userLoggedIn(state, action);
        case actionTypes.USER_SIGNED_UP: return userSignedUp(state, action);
        default: return state;
    }
};

export default reducer;
