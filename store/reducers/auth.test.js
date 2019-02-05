import reducer from './auth.js';
import * as actionTypes from '../../config/store/actions/types.js';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            data: null,
            from: null
        });
    });

    it('should store data loaded', () => {
        expect(reducer({
            data: null,
            from: null
        }, {
            type: actionTypes.LOAD_ABOUT_PAGE_DATA,
            data: 'DATA'
        })).toEqual({
            data: 'DATA',
            from: 'LOADED FROM Action loadAboutPageData (fetch github)'
        });
    });
});
