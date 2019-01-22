/* eslint-disable no-useless-constructor,no-loop-func */
/*global daum*/

import React, {Component} from 'react';
import './Map.scss';

let map;

class Map extends Component {

    renderMarket = () => {
        //positions에는 데이터 넣는부분. DB에서 가지고오면 됨.
        let positions = [
            {
                latlng: new daum.maps.LatLng(33.450705, 126.570677)
            }
        ];

        for (let i = 0; i < positions.length; i ++) {
            let marker = new daum.maps.Marker({
                map: map,
                position: positions[i].latlng
            });

            let overlay = new daum.maps.CustomOverlay({
                content: '컨텐츠',
                map: map,
                position: marker.getPosition()
            });

            (function(marker, overlay) {
                daum.maps.event.addListener(marker, 'click', function() {
                    overlay.setMap(map);
                });
            })(marker, overlay);
        }

    };

    showPosition = (position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let mapContainer = document.getElementById('map'),
            mapOption = {
                center: new daum.maps.LatLng(latitude, longitude),
                level: 3
            };

        map = new daum.maps.Map(mapContainer, mapOption);

        this.renderMarket();
    };


    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            alert('허용하지 않으면 이 서비스 사용에 제한됩니다.');
        }
    }


    render() {
        return (
            <div>
                <div id="map" style={{width: 100 + 'vw', height: 100 + 'vh'}}/>
            </div>
        )
    };
}

export default Map;