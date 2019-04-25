import React from 'react';
import './App.scss';
import {Route, Switch} from 'react-router-dom';
import StoreList from '../organisms/StoreList';
import Map from '../components/Map';
import ReviewDetail from './ReviewDetail';
import Reservation from './Reservation';
import StoreDetail from './StoreDetail';
import {isMobile} from '../_common/const/const';
import 'es6-promise/auto';
import 'babel-polyfill';

const App = () => {
  return (
    <main className='main'>
      {
        isMobile || <section className='stores'><StoreList/></section>
      }
      <section className='map'>
        <Map/>
      </section>
      {
        !isMobile || <section className='stores'><StoreList/></section>
      }
      <Switch>
        <Route path={'/stores/:id/reviews/:reviewId'} component={ReviewDetail}/>
        <Route path={'/stores/:id/reserve'} component={Reservation}/>
        <Route path={'/stores/:id'} component={StoreDetail}/>
      </Switch>
    </main>
  );
}

export default App;