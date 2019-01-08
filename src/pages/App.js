import React, { Component } from 'react';
import './App.scss';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import Map from '../components/Map';
import StoreCard from '../organisms/StoreCard';
import StoreDetail from '../organisms/StoreDetail';
import Reservation from '../organisms/Reservation';

class App extends Component {

    componentDidMount() {
        this.getStores();
    }

    getStores = async () => {
        let stores = await this.callApi();
        this.setState({
            stores
        });
    };

    callApi = () => {
        // Api 호출 Test Code
        return [{
            imgSrc: 'https://www.jeongdong.or.kr/static/portal/img/HKPU_04_04_pic1.jpg',
            imgAlt: '스타벅스 아주대점',
            name: '스타벅스 아주대점',
            address: '경기도 수원시 팔달구 우만2동 월드컵로 205',
            tel: '031-215-4516',
            description: '카페',
            no: 1,
        }, {
            imgSrc: 'https://hilton.co.kr/static/upload/hotel_main_20180808102604_lg_sp.jpg',
            imgAlt: '탐앤탐스 수원아주대점',
            name: '탐앤탐스 수원아주대점',
            address: '경기도 수원시 영통구 원천동 아주로 46',
            tel: '031-211-3565',
            description: '24시 카페',
            no: 2,
        }]
    };

    renderCards = () => {
        return this.state.stores.map((store) => {
            return <article
                className='store'
                key={store.no}>
                <Link to={`/stores/${store.no}`}
                    style={{ textDecoration: 'none' }}>
                    <StoreCard
                        imgSrc={store.imgSrc}
                        imgAlt={store.imgAlt}
                        name={store.name}
                        address={store.address}
                        tel={store.tel}
                        description={store.description} />
                </Link>
            </article>
        });
    };

    renderDetail = () => {
        let no = this.props.match.params.no;
        let store = this.state.stores[no - 1];
        
        return <StoreDetail
            no={no}
            imgSrc={store.imgSrc}
            imgAlt={store.imgAlt}
            name={store.name}
            address={store.address}
            tel={store.tel}
            description={store.description}
        />;
    };

    renderReservation = () => {
        return <Reservation

        />;
    };

    render() {
        let stores = this.state && this.state.stores;
        let isDetail = stores && this.props.match.params && this.props.match.params.no;
        let query = queryString.parse(this.props.location.search);
        let isReserve = query && query.reserve && query.reserve === 'true';

        return (
            <div className='main'>
                <section>
                    {isDetail && ((isReserve && this.renderReservation()) || this.renderDetail())}
                </section>
                <section className={(stores && 'with-stores') || 'no-stores'}>
                    {stores && this.renderCards()}
                </section>
                <section className='map'>
                    <Map />
                </section>
            </div>
        );
    }
}

export default App;