import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../../config/store/actions/types.js';
import { loadingAboutPageDataSaga } from './pages/about.js';
import { userSignUpSaga } from './auth.js';

export function* watchAbout() {
  yield takeEvery(actionTypes.FETCH_ABOUT_PAGE_DATA, loadingAboutPageDataSaga);
}

export function* watchAuth() {
  yield takeEvery(actionTypes.USER_SIGNUP, userSignUpSaga);
}
