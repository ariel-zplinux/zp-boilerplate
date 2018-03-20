import * as actionTypes from '../../../config/store/actions/types.js';
import { About } from '../../../pages/about.js'

export const loadedAboutPageData = (data) => {
    return {
        type: actionTypes.LOAD_ABOUT_PAGE_DATA,
        data
    };
};

export const loadingAboutPageData = (url) => {
    return (dispatch) => {
        About.fetchAboutData(url)
            .then((data) => {
                setTimeout(
                    () => {
                        console.log('=== DISPATCHING')
                        dispatch(loadedAboutPageData(data));
                    }, 
                    2000
                );
            })
            .catch(err => {
                console.error(err);
                dispatch(loadedAboutPageData({
                    error: err,
                    from: 'CATCH FROM About.fetchAboutData in componentDidMount'
                }));
            });
    };
};
