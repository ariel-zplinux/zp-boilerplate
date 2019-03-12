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

function userSignUp(saga) {
  const url = 'http://localhost:4000/api/Users';

  const params = JSON.stringify(saga.credentials);

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
      // log in after successful signup
      return userLogIn(saga.credentials);
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

    // user logged in
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
        throw new Error(response);
      }

      return data;
    })
    .catch((error) => {
      console.log({error});

      return null;
    })
}

export function* userLogOutSaga(saga) {
  try {
    const {accessToken} = saga.data;

    const loggedOut = yield userLogOut(accessToken);

    // user logged out
    if (loggedOut) {
      yield put(actions.userLoggedOut());
    }
    // failure
    else {
      yield put(actions.userLogOutFailure(data));
    }

    return true;
  }
  catch (error) {
    console.log({error})

    return false;
  }
};

function userLogOut(accessToken) {
  const url = `http://localhost:4000/api/Users/logout?access_token=${accessToken}`;

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
    .then((response) => response.text())
    .then((data) => {
      if (!data)
        return true;

      return false;
    })
    .catch((error) => {
      console.log({error});

      return null;
    })
}
