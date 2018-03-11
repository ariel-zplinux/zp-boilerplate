import * as actionTypes from '../../../config/store/actions/types.js';

export const loadedAboutPageData = (data) => {
    return {
        type: actionTypes.LOAD_ABOUT_PAGE_DATA,
        data
    };
};

export const loadingAboutPageData = (data) => {
    return (dispatch) => {
    	setTimeout(
    		() => {
    			console.log('=== DISPATCHING')
    			dispatch(loadedAboutPageData(data));
    		},
    		3000
    	);
    }
};