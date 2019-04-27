import React from 'react';
import './StoreList.scss';
import {Link} from 'react-router-dom';
import StoreCard from './StoreCard';
import {isMobile} from '../../_common/const/const';
import {connect} from 'react-redux';

const StoreList = ({storeList}) => {

  const renderStores = () => {
    const perPageNo = (isMobile && 2) || 5;

    return storeList.map(store => {
      return (
        <article
          className='store'
          key={store.id}>
          <Link to={`/stores/${store.id}?reviewPageNo=1&perPageNo=${perPageNo}`}>
            <StoreCard
              imgSrc={store.img_src}
              imgAlt={store.store_name}
              name={store.store_name}
              address={store.address + store.detail_address}
              tel={store.store_tel}
              description={store.store_description}
            />
          </Link>
        </article>
      );
    });
  };

  return (
    <div className={(storeList.length && 'store-list') || 'none'}>
      {renderStores()}
    </div>
  );
};

const mapStateToProps = state => ({
  storeList: state.storeList
});

export default connect(mapStateToProps)(StoreList);