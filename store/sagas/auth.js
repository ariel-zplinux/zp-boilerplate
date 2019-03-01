import { put } from 'redux-saga/effects';

import * as actions from '../actions/index.js';

export function* userSignUpSaga(saga) {
  const credentials = saga.data.credentials;

  try {
    const user = yield userSignUp(credentials);

    // user signed up
    if (user) {
      yield put(actions.userSignedUp(user));
    }
    // failure
    else {
      yield put(actions.userSignUpFailure());
    }

    return true;
  }
  catch (error) {
    console.log({error})

    return false;
  }
};

function userSignUp(credentials) {
  const url = 'http://localhost:4000/api/Users';

  const params = JSON.stringify(credentials.credentials);

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: params
  })
    .then((response) => response.text())
    .then((data) => {
      // Handle api call return
      const response = JSON.parse(data);

      // throw error if error received
      if (response.error && !response.id) {
        throw new Error(data);
      }

      return data;
    })
    .catch((error) => {
      console.log({error});

      return null;
    })
  }

export function* userLogInSaga(saga) {
  try {
    const credentials = saga.data;
    const user = yield userLogIn(credentials);

    // user signed up
    if (user) {
      yield put(actions.userLoggedIn(user));
    }
    // failure
    else {
      yield put(actions.userLogInFailure());
    }

    return true;
  }
  catch (error) {
    console.log({error})

    return false;
  }
};

function userLogIn(credentials) {
  const url = 'http://localhost:4000/api/Users/login';
  const params = JSON.stringify(credentials);

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: params
  })
    .then((response) => response.text())
    .then((data) => {
      // Handle api call return
      const response = JSON.parse(data);

      // throw error if error received
      if (response.error && !response.id) {
        console.log('== ERORR ')
        throw new Error(data);
      }

      return data;
    })
    .catch((error) => {
      console.log({error});

      return null;
    })
  }

