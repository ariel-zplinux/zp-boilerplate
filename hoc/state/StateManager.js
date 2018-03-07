import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from '../../store/reducers/pages/about.js'

const store = createStore(reducer);

const StateManager = (App) => {
    class StateManagerClass extends Component {
        constructor(props) {
            super(props);
    
            this.state = {
                pages: {
                    about: {
                        data: null
                    },
                    index: {
                        data: null                    
                    }
                }
            };
        }
    
        render() {
            return (
                <Provider store={store}>
                    <App />
                </Provider>
            )
        }
    }
    
    StateManagerClass.propTypes = {
        children: PropTypes.node
    };

    return (
        StateManagerClass
    );
}

export default StateManager;