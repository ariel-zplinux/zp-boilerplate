import { put } from 'redux-saga/effects';

import * as actions from '../actions/index.js';

export function* userSignUpSaga(saga) {
  console.log('=====USER SIGNUP saga')
  const credentials = saga.data.credentials;
  console.log({credentials})

  try {
    const user = yield userSignUp(credentials);

    yield put(actions.userSignedUp(user));

    return true;
  }
  catch (error) {
    console.log({error})

    return false;
  }
};

function userSignUp(credentials) {
  const url = 'http://localhost:4000/api/Users'


  // fetch(url, {
  //   method: "POST", // *GET, POST, PUT, DELETE, etc.
  //   mode: "cors", // no-cors, cors, *same-origin
  //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //   credentials: "same-origin", // include, *same-origin, omit
    // headers: {
    //     "Content-Type": "application/json",
  //       // "Content-Type": "application/x-www-form-urlencoded",
  //   },


  console.log({credentials})

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(credentials)
  })
    .then((response) => response.text())
    .then((data) => {
      console.log({data});
      return data;
    })
    .catch((err) => {
      console.log({err})
    })
  }

