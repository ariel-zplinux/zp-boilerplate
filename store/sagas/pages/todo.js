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

export function* todoListLoadSaga(todo) {
  try {
    const data = yield todoListLoad(todo.data);
    console.log({data})
    yield put(actions.todoListLoaded(data));
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

function todoListLoad(todo) {
    const urlRaw = process.env.BACKEND_URL ?
      process.env.BACKEND_URL + "/api/Todos" :
      "http://localhost:4000/api/Todos";

    const url = new URL(urlRaw);

    const params = {
      "filter": {
        "where": {
          "todoListId": "1"
        }
      }
    };


    const search = new URLSearchParams(params)

    console.log({params});


    url.search = search;


    return fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => err);
}
