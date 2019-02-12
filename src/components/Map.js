/* eslint-disable no-useless-constructor,no-loop-func */
/*global daum*/

import React, { Component } from 'react';
import './Map.scss';

let map;

class Map extends Component {

    state = {
        isSearch: false
    };

    addEventListener = () => {
        // 중심 위치 변경 이벤트
        daum.maps.event.addListener(map, 'center_changed', () => {
            this.handleMove();
        });

        // 확대 축소 이벤트
        daum.maps.event.addListener(map, 'zoom_changed', () => {
            this.handleMove();
        });
    };

    handleMove = () => {
        this.state.isSearch && this.setState({
            isSearch: !this.state.isSearch
        });
    };

    searchStores = () => {
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
        };

        this.props.handleSearch(position);
        this.setState({
            isSearch: !this.state.isSearch
        });
        this.renderMarket();
    };

    renderMarket = () => {
        this.props.stores.forEach(store => {
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
        if (("daum" in window)) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            let mapContainer = document.getElementById('map'),
                mapOption = {
                    center: new daum.maps.LatLng(latitude, longitude),
                    level: 3
                };

            map = new daum.maps.Map(mapContainer, mapOption);

            this.addEventListener();
        }
    };


    componentDidMount() {
        let geo_success = (position) => {
            this.showPosition(position);
        };

        let geo_error = () => {
            // alert('허용하지 않으면 이 서비스 사용에 제한됩니다.');
            this.showPosition({
                coords: {
                    latitude: 33.506525,
                    longitude: 126.492780
                }
            });
        };

        let geo_options = {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 20000
        };

        navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
    }


    render() {
        return (
            <div>
                {
                    !this.state.isSearch && <div className='research-box'>
                        <button type='button' className='btn-research' onClick={this.searchStores}>이 위치에서 가게 재검색</button>
                    </div>
                }
                <div id="map" style={{ height: window.innerHeight + 'px' }} />
            </div>
        )
    };
}

export default Map;