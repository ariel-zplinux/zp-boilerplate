import * as actionTypes from '../../../config/store/actions/types.js';

export const todoCreate = (data) => {
  console.log("== ACTION todoCreate")
  return {
    type: actionTypes.TODO_CREATE,
    data
  };
};

export const todoCreated = (data) => {
  return {
    type: actionTypes.TODO_CREATED,
    data
  };
};


export const todoListLoad = (data) => {
  return {
    type: actionTypes.TODO_LIST_LOAD,
    data
  };
};

export const todoListLoaded = (data) => {
  return {
    type: actionTypes.TODO_LIST_LOAD,
    data
  };
};

