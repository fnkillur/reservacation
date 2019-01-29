import React, { Component } from 'react';
import './StoreDetail.scss';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import Image from '../components/Image';
import TitleBox from '../components/TitleBox';
import SectionDivider from '../components/SectionDivider';
import Modal from '../components/Modal';
import StoreCard from '../organisms/StoreCard';
import ReviewList from '../organisms/ReviewList';
import * as storeService from '../_common/services/store.service';
import * as userService from '../_common/services/user.service';


class StoreDetail extends Component {

    state = {
        store: '',
        images: ''
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        id && this.fetchStoreDetail(id);
    }

    fetchStoreDetail = async (id) => {
        let res = await storeService.getStoreById(id);

        this.setState({
            store: res.data.store,
            images: res.data.images
        });
    }

    renderStoreCard = () => {
        let store = this.state.store;
        return <StoreCard
            imgSrc={store.img_src}
            imgAlt={store.store_name}
            name={store.store_name}
            address={store.address + store.detail_address}
            tel={store.store_tel}
            description={store.store_description}
        />;
    };

    renderImages = () => {
        return this.state.images.map(img => {
            return <div className='img' key={img.id}>
                <Image
                    src={img.src}
                    alt={this.state.store.store_name} />
            </div>;
        });
    };

    renderBtnReserveOrLogin = (id, query) => {
        let isLogin = userService.identifyLogin();
        if (isLogin) {
            return <Link to={`/stores/${id}/reserve`}>
                <button className='btn-reserve'>예약하기</button>
            </Link>;
        } else {
            return <Link to={{ pathname: '/auth/login', search: `callback_url=/stores/${id}?reviewPageNo=${query.reviewPageNo}&perPageNo=${query.perPageNo}` }}>
                <button className='btn-reserve'>로그인 후 예약하기</button>
            </Link>;
        }
    }

    pushQueryString = (reviewPageNo, perPageNo) => {
        this.props.history.push({
            search: `?reviewPageNo=${reviewPageNo}&perPageNo=${perPageNo}`
        });
    };

    render() {
        let id = this.props.match.params.id;
        let query = queryString.parse(this.props.location.search);

        return (
            <Modal to={'/stores'}>
                <article className='store-detail'>
                    {this.renderBtnReserveOrLogin(id, query)}
                    <SectionDivider />
                    <section className='store-info'>
                        {this.state.store && this.renderStoreCard()}
                    </section>
                    <SectionDivider />
                    <TitleBox contents={(this.state.images && `${this.state.store.store_name}의 분위기 넘치는 사진들`) || ''} />
                    <section className='img-list'>
                        {this.state.images && this.renderImages()}
                    </section>
                    <SectionDivider />
                    <button className='btn-review'>리뷰</button>
                    <button className='btn-qna'>QnA</button>
                    <section className='reviews'>
                        <ReviewList
                            id={id}
                            reviewPageNo={query.reviewPageNo}
                            perPageNo={query.perPageNo}
                            pushQueryString={this.pushQueryString} />
                    </section>
                </article>
            </Modal>
        );
    }
}

export default StoreDetail