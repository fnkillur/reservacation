import React, { Component } from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import StoreList from '../organisms/StoreList';
import Map from '../components/Map';
import ReviewDetail from './ReviewDetail';
import Reservation from './Reservation';
import StoreDetail from './StoreDetail';
import { isMobile } from '../_common/const/const';
import * as storeService from '../_common/services/store.service';

class App extends Component {

    state = {
        stores: []
    };

    handleSearch = async (position) => {
        try {
            let res = await storeService.getAroundStores(position);
            this.setState({
                stores: res.data
            });
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        return (
            <div className='main'>
                {
                    isMobile || <section className='stores'><StoreList stores={this.state.stores} /></section>
                }
                <section className='map'>
                    <Map stores={this.state.stores}
                        handleSearch={this.handleSearch} />
                </section>
                {
                    !isMobile || <section className='stores'><StoreList stores={this.state.stores} /></section>
                }
                <Switch>
                    <Route path={'/stores/:id/reviews/:reviewId'} component={ReviewDetail} />
                    <Route path={'/stores/:id/reserve'} component={Reservation} />
                    <Route path={'/stores/:id'} component={StoreDetail} />
                </Switch>
            </div>
        );
    }
}

export default App;