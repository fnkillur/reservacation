import React, { Component } from 'react';
import './StoreList.scss';
import { Link } from 'react-router-dom';
import StoreCard from '../organisms/StoreCard';
import * as storeService from '../_common/services/store.service';

class StoreList extends Component {

    state = {
        stores: ''
    }

    componentDidMount() {
        this.fetchStores();
    }

    fetchStores = async () => {
        let res = await storeService.getStores();
        this.setState({
            stores: res.data
        });
    };

    renderStores = () => {
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
        return (
            <div className='store-list'>
                {this.state.stores && this.renderStores()}
            </div>
        );
    }
}

export default StoreList;