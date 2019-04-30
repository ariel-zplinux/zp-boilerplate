import reducer from './auth.js';
import * as actionTypes from '../../config/store/actions/types.js';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            "data": null,
            "from": null,
            "error": null,
            "user": null
        });
    });
});
