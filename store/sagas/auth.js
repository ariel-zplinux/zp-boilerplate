import { put } from 'redux-saga/effects';

import * as actions from '../actions/index.js';

export function* userSignUpSaga(saga) {
  const credentials = saga.data.credentials;

  try {
    const user = yield userSignUp(credentials);

    // user signed up
    // { title: "Signed up successfully", content: "Please check your email and click on the verification link before logging in." }
    if (user.title === "Signed up successfully") {
      yield put(actions.userSignedUp(user.content));
    }
    // failure
    // {error: Object { statusCode: 422, name: "ValidationError", message: "L'instance `user` n'est pas valide. … }
    else if (user.error && user.error.message) {
      yield put(actions.userSignUpFailure(user.error.message));
    }
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

      // log in after successful signup
      // return userLogIn(saga.credentials);

      return response;
    })
    .catch((error) => {
      console.log({error});

      return null;
    })
}

export function* userLogInSaga(saga) {
  try {
    const credentials = saga.data;
    const loggedIn = yield userLogIn(credentials);

    const user = loggedIn && JSON.parse(loggedIn)

    // user logged in
    if (user.accessToken) {
      yield put(actions.userLoggedIn(user));
    }
    // email not verified yet
    else if (user.content && user.content.statusCode === 401 && user.content.code === "LOGIN_FAILED_EMAIL_NOT_VERIFIED") {
      yield put(actions.userLogInFailure(`${user.title} - Email not verified`));
    }
    // failure
    else {
      yield put(actions.userLogInFailure(user.title));
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
