import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import pageReducers from '../../store/reducers/pages.js';
import authReducer from '../../store/reducers/auth.js';
import { watchAbout, watchAuth } from '../../store/sagas/index.js'


const rootReducer = combineReducers({
    page: pageReducers,
    auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, sagaMiddleware)
);

sagaMiddleware.run(watchAbout);
sagaMiddleware.run(watchAuth);

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
