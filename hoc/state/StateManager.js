import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import pageReducers from '../../store/reducers/pages.js'

const rootReducer = combineReducers({
    page: pageReducers
});

const store = createStore(rootReducer);

const StateManager = (App) => {
    class StateManagerClass extends Component {
        constructor(props) {
            super(props);
    
            this.state = {
                page: {
                    data: null                    
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
