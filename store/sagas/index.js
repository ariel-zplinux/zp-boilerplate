import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../../config/store/actions/types.js';
import { loadingAboutPageDataSaga } from './pages/about.js';
import { userSignUpSaga, userLogInSaga, userLogOutSaga } from './auth.js';
import { todoCreateSaga } from './pages/todo.js';

export function* watchAbout() {
  yield takeEvery(actionTypes.FETCH_ABOUT_PAGE_DATA, loadingAboutPageDataSaga);
}

export function* watchAuth() {
  yield takeEvery(actionTypes.USER_LOGIN, userLogInSaga);
  yield takeEvery(actionTypes.USER_SIGNUP, userSignUpSaga);
  yield takeEvery(actionTypes.USER_LOGOUT, userLogOutSaga);
}

export function* watchTodos() {
  yield takeEvery(actionTypes.TODO_CREATE, todoCreateSaga);
}
