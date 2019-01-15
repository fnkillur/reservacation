import React, { Component } from 'react';
import './App.scss';
import { Route, Link, Switch } from 'react-router-dom';
import Map from '../components/Map';
import StoreCard from '../organisms/StoreCard';
import StoreDetail from './StoreDetail';
import Reservation from './Reservation';
import Login from './Login';
import * as storeService from '../_common/services/store.serivce';

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
                <Link to={`stores/${store.no}`}
                    style={{ textDecoration: 'none' }}>
                    <StoreCard
                        imgSrc={store.imgsrc}
                        imgAlt={store.imgalt}
                        name={store.name}
                        address={store.address}
                        tel={store.phone}
                        description={store.description} />
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
                    <Route path={'/stores/:no/login'} component={Login} />
                    <Route path={'/stores/:no/:token'} component={Reservation} />
                    <Route path={`/stores/:no`} component={StoreDetail} />
                </Switch>
            </div>
        );
    }
}

export default App;