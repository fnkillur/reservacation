import React, { Component } from 'react';
import './App.scss';
import { Route, Link, Switch } from 'react-router-dom';
import Map from '../components/Map';
import StoreCard from '../organisms/StoreCard';
import StoreDetail from './StoreDetail';
import Reservation from './Reservation';
import Login from './Login';
import * as storeService from '../_common/services/store.service';

class App extends Component {

    componentDidMount() {
        this.fetchStores();
    }

    fetchStores = async () => {
        let res = await storeService.getStores();
        this.setState({
            stores: res.data
        });
    };

    renderCards = () => {
        return this.state.stores.map((store) => {
            return <article
                className='store'
                key={store.id}>
                <Link to={`stores/${store.id}`}
                    style={{ textDecoration: 'none' }}>
                    <StoreCard
                        imgSrc={store.img_src}
                        imgAlt={store.store_name}
                        name={store.store_name}
                        address={store.address + store.detail_address}
                        tel={store.store_tel}
                        description={store.store_description} />
                </Link>
            </article>
        });
    };

    render() {
        let stores = this.state && this.state.stores;

        return (
            <div className='main'>
                <section className={(stores && 'with-stores') || 'no-stores'}>
                    {stores && this.renderCards()}
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