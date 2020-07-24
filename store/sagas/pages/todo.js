import { put } from 'redux-saga/effects';

import * as actions from '../../actions/index.js';

export function* todoCreateSaga(todo) {
  try {
    const data = yield todoCreate(todo.data);
    yield put(actions.todoCreated(data));
  }
  catch(error) {
    // TODO adapt
    console.error({error})
    // yield put(actions.loadedAboutPageData({
    //   error: err,
    //   from: 'CATCH FROM About.fetchAboutData in componentDidMount'
    // }));
  }
};

function todoCreate(todo) {
    const url = process.env.BACKEND_URL ?
      process.env.BACKEND_URL + "/api/Todos" :
      "http://localhost:4000/api/Todos";

    // temp to match expected Todo model
    todo.name = todo.content;

    return fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(todo)
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => err);
}
