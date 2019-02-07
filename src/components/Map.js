/* eslint-disable no-useless-constructor,no-loop-func */
/*global daum*/

import React, { Component } from 'react';
import './Map.scss';
import * as storeService from '../_common/services/store.service';

let map;

class Map extends Component {

    addEventListener = () => {
        // 중심 위치 변경 이벤트
        daum.maps.event.addListener(map, 'center_changed', () => {
            this.changeHandler();
        });

        // 확대 축소 이벤트
        daum.maps.event.addListener(map, 'zoom_changed', () => {
            this.changeHandler();
        });
    };

    changeHandler = () => {
        let bounds = map.getBounds();
        // 현재 지도의 남서쪽 좌표
        let swLatLng = bounds.getSouthWest();
        // 현재 지도의 북동쪽 좌표
        let neLatLng = bounds.getNorthEast();

        let position = {
            bot: swLatLng.getLat(),
            left: swLatLng.getLng(),
            top: neLatLng.getLat(),
            right: neLatLng.getLng()
        }

        this.fetchAroundStores(position);
    };

    fetchAroundStores = async (position) => {
        try {
            let res = await storeService.getAroundStores(position);
            this.renderMarket(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    renderMarket = (stores) => {
        stores.forEach(store => {
            let marker = new daum.maps.Marker({
                map: map,
                position: new daum.maps.LatLng(store.latitude, store.longitude)
            });

            let overlay = new daum.maps.CustomOverlay({
                content: store.store_name,
                map: map,
                position: marker.getPosition()
            });

            (function (marker, overlay) {
                daum.maps.event.addListener(marker, 'click', function () {
                    overlay.setMap(map);
                });
            })(marker, overlay);
        });
    };

    showPosition = (position) => {
        console.log(position);
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let mapContainer = document.getElementById('map'),
            mapOption = {
                center: new daum.maps.LatLng(latitude, longitude),
                level: 3
            };

        map = new daum.maps.Map(mapContainer, mapOption);

        this.addEventListener();
    };


    componentDidMount() {
        let geo_success = (position) => {
            this.showPosition(position);
        };
        
        let geo_error = () => {
            alert('허용하지 않으면 이 서비스 사용에 제한됩니다.');
            this.showPosition({
                coords: {
                    latitude: 33.506525,
                    longitude: 126.492780
                }
            });
        };

        let geo_options = {
            enableHighAccuracy: true, 
            maximumAge        : 30000, 
            timeout           : 20000
        };

        navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
    }


    render() {
        return (
            <div>
                <div id="map" style={{height: window.innerHeight + 'px'}}/>
            </div>
        )
    };
}

export default Map;