import React, { Component } from 'react';
import Map from '../components/Map';
import StoreCard from '../organisms/StoreCard';
import './Main.scss';
import Modal from '../components/Modal';

class Main extends Component {
    constructor(prop) {
        super(prop);
        this.state = { isOpen: false };
    }

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
            img_src: 'https://www.jeongdong.or.kr/static/portal/img/HKPU_04_04_pic1.jpg',
            img_alt: '스타벅스 아주대점',
            name: '스타벅스 아주대점',
            address: '경기도 수원시 팔달구 우만2동 월드컵로 205',
            tel: '031-215-4516',
            description: '카페',
            no: 1,
        }, {
            img_src: 'https://hilton.co.kr/static/upload/hotel_main_20180808102604_lg_sp.jpg',
            img_alt: '탐앤탐스 수원아주대점',
            name: '탐앤탐스 수원아주대점',
            address: '경기도 수원시 영통구 원천동 아주로 46',
            tel: '031-211-3565',
            description: '24시 카페',
            no: 2,
        }]
    };

    renderCards = () => {
        return this.state.stores.map(store => {
            return <StoreCard
                img_src={store.img_src}
                img_alt={store.img_alt}
                store_name={store.name}
                store_address={store.address}
                store_tel={store.tel}
                store_description={store.description}
                key={store.no}
                onClick={this.toggleModal}
            />
        });
    };

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        let stores = this.state.stores;
        return (
            <div className='main'>
                <section>
                    <Modal
                        show={this.state.isOpen}
                        onClose={this.toggleModal}>
                        <div>팝업창</div>
                    </Modal>
                </section>
                <section className={stores ? 'with-stores' : 'no-stores'}>
                    {stores ? this.renderCards() : ''}
                </section>
                <section className='map'>
                    <Map />
                </section>
            </div>
        );
    }
}

export default Main;