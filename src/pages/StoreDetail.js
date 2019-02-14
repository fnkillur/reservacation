import React, { Component } from 'react';
import './StoreDetail.scss';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import Image from '../components/Image';
import TitleBox from '../components/TitleBox';
import SectionDivider from '../components/SectionDivider';
import Modal from '../components/Modal';
import StoreCard from '../organisms/StoreCard';
import ReviewForm from '../organisms/ReviewForm';
import ReviewList from '../organisms/ReviewList';
import * as storeService from '../_common/services/store.service';
import * as userService from '../_common/services/user.service';
import * as reviewService from '../_common/services/review.service';


class StoreDetail extends Component {

    state = {
        store: '',
        images: '',
        reviewFormClass: false
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.store !== this.state.store)
            || (nextState.images !== this.state.images)
            || (nextState.reviewFormClass !== this.state.reviewFormClass);
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        id && this.fetchStoreDetail(id);
    }

    fetchStoreDetail = async (id) => {
        try {
            let res = await storeService.getStoreById(id);
            this.setState({
                store: res.data.store,
                images: res.data.images
            });
        } catch (error) {
            console.error(error);
        }
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
            whiteSpace='pre-wrap'
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

    pushQueryString = (reviewPageNo, perPageNo) => {
        this.props.history.push({
            search: `?reviewPageNo=${reviewPageNo}&perPageNo=${perPageNo}`
        });
    };

    toggleReviewForm = () => {
        this.setState({
            reviewFormClass: !this.state.reviewFormClass
        })
    };

    handleCreate = async (review) => {
        try {
            let res = await reviewService.writeReview(review);
            alert(res.data.message);
            this.toggleReviewForm();
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    render() {
        let id = this.props.match.params.id;
        let query = queryString.parse(this.props.location.search);
        let token = userService.identifyLogin();

        return (
            <Modal to={'/stores'}>
                <article className='store-detail'>
                    {(token && <Link to={{
                        pathname: `/stores/${id}/reserve`,
                        search: `callback_url=/stores/${id}?reviewPageNo=${query.reviewPageNo}&perPageNo=${query.perPageNo}`
                    }}>
                        <button className='btn-reserve'>예약하기</button>
                    </Link>)
                        || <Link to={{
                            pathname: '/auth/login',
                            search: `callback_url=/stores/${id}?reviewPageNo=${query.reviewPageNo}&perPageNo=${query.perPageNo}`
                        }}>
                            <button className='btn-reserve'>로그인 후 예약하기</button>
                        </Link>}
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
                    <TitleBox contents={(this.state.images && `${this.state.store.store_name}의 생생한 리뷰들`) || ''} />
                    <section className='store-reviews'>
                        <ReviewList
                            id={id}
                            reviewPageNo={query.reviewPageNo}
                            perPageNo={query.perPageNo}
                            pushQueryString={this.pushQueryString} />
                    </section>
                    <SectionDivider />
                    <section className='review-button'>
                        {(token && <button className='btn-review' onClick={this.toggleReviewForm}>
                            {(!this.state.reviewFormClass && '리뷰 작성하기') || '작성 취소'}
                        </button>)}
                    </section>
                    <section className={(this.state.reviewFormClass && 'review-create') || 'review-hidden'}>
                        <ReviewForm storeId={id} onCreate={this.handleCreate} />
                    </section>
                </article>
            </Modal >
        );
    }
}

export default StoreDetail;