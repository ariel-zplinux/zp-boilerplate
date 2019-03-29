import * as actionTypes from '../../config/store/actions/types.js';

export const resolveClient = () => {
  const action = {
    type: actionTypes.RESOLVE_CLIENT
  };

  return action;
};

export const resolveServer = () => {
  const action = {
    type: actionTypes.RESOLVE_SERVER
  };

  return action;
};

export const objectsResolved = (data) => {
  const action = {
    type: actionTypes.OBJECTS_RESOLVED,
    data
    };

  return action;
}

export const resetObjectsResolved = (data) => {
  const action = {
    type: actionTypes.RESET_OBJECTS_RESOLVED,
    data
    };

  return action;
}
