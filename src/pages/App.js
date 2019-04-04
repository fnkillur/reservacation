/* eslint-disable no-useless-constructor,no-loop-func */
/*global daum*/

import React, {Component} from 'react';
import './App.scss';
import {Route, Switch} from 'react-router-dom';
import StoreList from '../organisms/StoreList';
import Map from '../components/Map';
import ReviewDetail from './ReviewDetail';
import Reservation from './Reservation';
import StoreDetail from './StoreDetail';
import {isMobile} from '../_common/const/const';
import * as storeService from '../_common/services/store.service';
import 'es6-promise/auto';

class App extends Component {

    state = {
        stores: [],
        markers: []
    };

    handleSearch = async position => {
        try {
            let res = await storeService.getAroundStores(position);

            this.state.markers.forEach(marker => {
                marker.infoWindow.setMap(null);
                marker.pin.setMap(null);
            });

            let markers = res.data.map(store => {

                let marker = new daum.maps.Marker({
                    position: new daum.maps.LatLng(store.latitude, store.longitude)
                });

                let infoWindow = new daum.maps.InfoWindow({
                    position: new daum.maps.LatLng(store.latitude, store.longitude),
                    content: `<div class="info-window">${store.store_name}<br>${store.address}</div>`,
                    removable: true
                });

                // (function (marker, infoWindow) {
                //     daum.maps.event.addListener(infoWindow, 'click', () => {
                //         console.log('come');
                //         this.props.history.push(`/stores/${store.id}?reviewPageNo=1&perPageNo=${(isMobile && 2) || 5}`);
                //     });
                // })(marker, infoWindow);

                return {pin: marker, infoWindow};
            });

            this.setState({
                stores: res.data,
                markers
            });

        } catch (error) {
            console.error(error);
        }
    };

    render() {
        return (
            <div className='main'>
                {
                    isMobile || <section className='stores'><StoreList stores={this.state.stores}/></section>
                }
                <section className='map'>
                    <Map markers={this.state.markers}
                         handleSearch={this.handleSearch}/>
                </section>
                {
                    !isMobile || <section className='stores'><StoreList stores={this.state.stores}/></section>
                }
                <Switch>
                    <Route path={'/stores/:id/reviews/:reviewId'} component={ReviewDetail}/>
                    <Route path={'/stores/:id/reserve'} component={Reservation}/>
                    <Route path={'/stores/:id'} component={StoreDetail}/>
                </Switch>
            </div>
        );
    }
}

export default App;