import React from 'react';
import { shallow } from 'enzyme';
import { Message, Icon } from 'semantic-ui-react';

import Status from './Status.js';

describe('<Status />', () => {
    it('Should contains one Message', () => {
        const wrapper = shallow(<Status/>);
        expect(wrapper.find(Message)).toHaveLength(1);
    })
});