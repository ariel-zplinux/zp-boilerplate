import { put } from 'redux-saga/effects';

// import { About } from '../../../pages/about.js'
import * as actionTypes from '../../../config/store/actions/types.js';
import * as actions from '../../actions/index.js';
import config from '../../../config/pages/about.js'

export function* loadingAboutPageDataSaga({url}) {
    try {
        const data = yield fetchAboutData(url);
        yield put(actions.loadedAboutPageData(data));
    }
    catch(error) {
        yield put(loadedAboutPageData({
            error: err,
            from: 'CATCH FROM About.fetchAboutData in componentDidMount'
        }));
    }
};

function fetchAboutData(AboutUrl) {
    const url = AboutUrl ? AboutUrl : config.GITHUB_README_URL;

    return fetch(url)
        .then((response) => {
            return response.text()
        })
        .then((data) => {
            return data
        })
        .catch((err) => err);
}
