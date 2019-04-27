import React from 'react';
import './Main.scss';
import {Route, Switch} from 'react-router-dom';
import StoreList from '../organisms/store/StoreList';
import Map from '../components/Map';
import ReviewDetail from './ReviewDetail';
import Reservation from './Reservation';
import Store from './Store';
import {isMobile} from '../_common/const/const';

const Main = () => {
  return (
    <main className='main'>
      {isMobile || <section className='stores'><StoreList/></section>}
      <section className='map'>
        <Map/>
      </section>
      {!isMobile || <section className='stores'><StoreList/></section>}
      <Switch>
        <Route path={'/stores/:id/reviews/:reviewId'} component={ReviewDetail}/>
        <Route path={'/stores/:id/reserve'} component={Reservation}/>
        <Route path={'/stores/:id'} component={Store}/>
      </Switch>
    </main>
  );
};

export default Main;