import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../../config/store/actions/types.js';
import { loadingAboutPageDataSaga } from './pages/about.js';

export function* watchAbout() {
    yield takeEvery(actionTypes.FETCH_ABOUT_PAGE_DATA, loadingAboutPageDataSaga);
}
