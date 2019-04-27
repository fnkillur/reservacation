import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Main from '../pages/Main';
import Auth from '../pages/Auth';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import sagas from '../sagas/index';
import 'es6-promise/auto';
import 'babel-polyfill';

const saga = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(saga));

saga.run(sagas);

const Router = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <React.Fragment>
          <Route exact path="/" component={Main}/>
          <Route path="/stores" component={Main}/>
          <Route path='/auth' component={Auth}/>
        </React.Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default Router;