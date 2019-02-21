import React, { Component } from 'react';
import './StoreList.scss';
import { Link } from 'react-router-dom';
import StoreCard from '../organisms/StoreCard';
import { isMobile } from '../_common/const/const';

class StoreList extends Component {

    renderStores = () => {
        let perPageNo = (isMobile && 2) || 5;
        return this.props.stores.map(store => {
            return <article
                className='store'
                key={store.id}>
                <Link to={`/stores/${store.id}?reviewPageNo=1&perPageNo=${perPageNo}`}>
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
            <div className={(this.props.stores.length && 'store-list') || 'none'}>
                {this.props.stores && this.renderStores()}
            </div>
        );
    }
}

export default StoreList;