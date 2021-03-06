import { put } from 'redux-saga/effects';

import * as actions from '../../actions/index.js';
import config from '../../../config/pages/about.js'

export function* loadingAboutPageDataSaga({url}) {
  try {
        const data = yield fetchAboutData(url);

        yield put(actions.loadedAboutPageData(data));
    }
    catch(error) {
        yield put(actions.loadedAboutPageData({
            error: err,
            from: 'CATCH FROM About.fetchAboutData in componentDidMount'
        }));
    }
};

function fetchAboutData(AboutUrl) {
    const url = AboutUrl ? AboutUrl : config.GITHUB_README_URL;

    return fetch(url)
        .then((response) => response.text())
        .then((data) => data)
        .catch((err) => err);
}
