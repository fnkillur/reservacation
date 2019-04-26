import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import App from '../pages/App';
import Auth from '../pages/Auth';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import sagas from '../sagas/index';

const saga = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(saga));

saga.run(sagas);

const Router = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <React.Fragment>
          <Route exact path="/" component={App}/>
          <Route path="/stores" component={App}/>
          <Route path='/auth/login' component={Auth}/>
          <Route path='/auth/register' component={Auth}/>
          <Route path='/auth/findPassword' component={Auth}/>
        </React.Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default Router;