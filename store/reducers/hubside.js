import * as actionTypes from '../../config/store/actions/types.js';

export const initialState = {
  output: ''
};

const objectsResolved = (state, action) => {
  const updated = {
    output: action.data
  }

  return {
    ...state,
    ...updated
  };
};

const resetObjectsResolved = (state, action) => {
  return {
    ...initialState
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case actionTypes.OBJECTS_RESOLVED: return objectsResolved(state, action);
      case actionTypes.RESET_OBJECTS_RESOLVED: return resetObjectsResolved(state, action);
      default: return state;
  }
};

export default reducer;
