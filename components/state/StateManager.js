import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import pageReducers, { initialState as pageInitialState } from '../../store/reducers/pages.js';
import authReducer, { initialState as authInitialState } from '../../store/reducers/auth.js';
import {
  watchAbout,
  watchAuth,
  watchTodos
} from '../../store/sagas/index.js'


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
sagaMiddleware.run(watchTodos);

const StateManager = (App) => {
  class StateManagerClass extends Component {
    constructor(props) {
      super(props);

      this.state = {
        page: { ...pageInitialState },
        auth: { ...authInitialState }
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
