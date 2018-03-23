import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import pageReducers from '../../store/reducers/pages.js'
import { watchAbout } from '../../store/sagas/index.js'


const rootReducer = combineReducers({
    page: pageReducers
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer, 
    applyMiddleware(thunk, sagaMiddleware)
);

sagaMiddleware.run(watchAbout);

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
