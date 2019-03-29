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
