import { put } from 'redux-saga/effects';

import * as actions from '../actions/index.js';
import resolveObjectsClient from '../../lib/resolveObjects.js';

export function* resolveClientSaga() {
  try {
    const input = {
      a: {
        b: {
          c: 'z'
        }
      },
      'a.b.d': 'y'
    };

    const output = yield resolveClient(input);

    yield put(actions.objectsResolved({
      output
    }));

    return true;
  }
  catch (error) {
    return false;
  }
};

function resolveClient(input) {
  const output = resolveObjectsClient(input);

  return output;
}

export function* resolveServerSaga() {
  try {
    const input = {
      a: {
        b: {
          c: 'z'
        }
      },
      'a.b.d': 'y'
    };
    console.log({input})
    const output = yield resolveServer(input);
    yield put(actions.objectsResolved({
      output
    }));

    return true;
  }
  catch (error) {
    console.log({error})

    return false;
  }
};

function resolveServer(input) {
  const url = `http://localhost:4000/api/hubside/objects`;

  console.log('PASS')
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((response) => response.text())
    .then((data) => JSON.parse(data))
    .catch((error) => {
      console.log({error});

      return null;
    })
}
