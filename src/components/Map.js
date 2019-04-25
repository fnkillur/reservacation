/* eslint-disable no-useless-constructor,no-loop-func */
/*global daum*/

import React, {Component} from 'react';
import './Map.scss';
import {connect} from 'react-redux';
import {getAroundStores} from '../_common/services/store.service';
import {setStoreList, setMarkers, toggleSearch} from '../actions';

let map;

class Map extends Component {

  componentDidMount() {
    const geo_success = (position) => {
      this.showPosition(position);
    };

    const geo_error = () => {
      // 기본값은 제주 시청
      this.showPosition({
        coords: {
          latitude: 33.500361,
          longitude: 126.531139
        }
      });
    };

    const geo_options = {
      enableHighAccuracy: false,
      maximumAge: 30000,
      timeout: 20000
    };

    navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
  }

  showPosition = position => {
    if (("daum" in window)) {
      const longitude = (position.coords.longitude && position.coords.longitude > 126.143064 && position.coords.longitude < 126.971798) || 126.531139;
      const latitude = (position.coords.latitude && position.coords.latitude > 33.111343 && position.coords.latitude < 33.567587) || 33.500361;
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new daum.maps.LatLng(latitude, longitude),
        level: 3
      };

      map = new daum.maps.Map(mapContainer, mapOption);

      this.addEventListener();
    }
  };

  addEventListener = () => {
    // 중심 위치 변경 이벤트
    daum.maps.event.addListener(map, 'center_changed', this.handleShow);

    // 확대 축소 이벤트
    daum.maps.event.addListener(map, 'zoom_changed', this.handleShow);
  };

  handleShow = () => {
    !this.props.isSearchable && this.props.toggleSearch(true);
  };

  searchStores = () => {
    if (!map) {
      alert('지도가 보여지는 중입니다. 잠시 뒤에 다시 클릭해주시기 바랍니다.');
      return;
    }

    const bounds = map.getBounds();
    // 현재 지도의 남서쪽 좌표
    const swLatLng = bounds.getSouthWest();
    // 현재 지도의 북동쪽 좌표
    const neLatLng = bounds.getNorthEast();

    const position = {
      bot: swLatLng.getLat(),
      left: swLatLng.getLng(),
      top: neLatLng.getLat(),
      right: neLatLng.getLng()
    };

    this.handleSearch(position);
    this.props.toggleSearch(false);
  };

  handleSearch = async position => {
    try {
      const res = await getAroundStores(position);

      const aroundStores = res.data;
      const aroundMarkers = aroundStores.map(store => {
        const marker = new daum.maps.Marker({
          position: new daum.maps.LatLng(store.latitude, store.longitude)
        });

        const infoWindow = new daum.maps.InfoWindow({
          position: new daum.maps.LatLng(store.latitude, store.longitude),
          content: `<div class="info-window">${store.store_name}<br>${store.address}</div>`,
          removable: true
        });

        return {pin: marker, infoWindow};
      });

      this.props.markers.forEach(marker => {
        marker.infoWindow.setMap(null);
        marker.pin.setMap(null);
      });

      this.props.setStoreList(aroundStores);
      this.props.setMarkers(aroundMarkers);

    } catch (error) {
      console.error(error);
    }
  };

  renderMarkers = () => {
    this.props.markers.forEach(marker => {
      (function (marker, infoWindow) {
        daum.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(map, marker);
        });
      })(marker.pin, marker.infoWindow);

      marker.pin.setMap(map);
    });
  };

  renderSearchButton = () => {
    return (
      <div className='research-box'>
        <button type='button' className='btn-research' onClick={this.searchStores}>
          이 위치에서 가게 재검색
        </button>
      </div>
    );
  };

  render() {
    this.renderMarkers();

    return (
      <React.Fragment>
        {this.props.isSearchable && this.renderSearchButton()}
        <div id="map" style={{height: window.innerHeight + 'px'}}/>
      </React.Fragment>
    )
  };
}

const mapStateToProps = state => ({
  markers: state.markers,
  isSearchable: state.isSearchable
});

const mapDispatchToProps = dispatch => ({
  setStoreList: stores => dispatch(setStoreList(stores)),
  setMarkers: markers => dispatch(setMarkers(markers)),
  toggleSearch: isSearchable => dispatch(toggleSearch(isSearchable))
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);