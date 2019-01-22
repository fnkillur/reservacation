import React, { Component } from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import StoreList from '../organisms/StoreList';
import Map from '../components/Map';
import StoreDetail from './StoreDetail';
import Reservation from './Reservation';
import Login from './Login';


class App extends Component {

    render() {
        return (
            <div className='main'>
                <section className='stores'>
                    <StoreList />
                </section>
                <section className='map'>
                    <Map />
                </section>

                <Switch>
                    <Route path={'/stores/:id/login'} component={Login} />
                    <Route path={'/stores/:id/:token'} component={Reservation} />
                    <Route path={'/stores/:id'} component={StoreDetail} />
                </Switch>
            </div>
        );
    }
}

export default App;