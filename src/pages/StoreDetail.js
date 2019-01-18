import React, { Component } from 'react';
import './StoreDetail.scss';
import { Link } from 'react-router-dom';
import Image from '../components/Image';
import TitleBox from '../components/TitleBox';
import SectionDivider from '../components/SectionDivider';
import Modal from '../components/Modal';
import StoreCard from '../organisms/StoreCard';
import ReviewCard from '../organisms/ReviewCard';
import * as storeService from '../_common/services/store.service';
import * as reviewService from '../_common/services/review.service';

class StoreDetail extends Component {

    state = {
        store: '',
        images: '',
        reviews: ''
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        id && this.fetchStoreDetail(id);
    }

    fetchStoreDetail = async (id) => {
        let allData = await Promise.all([
            storeService.getStoreById(id, 0, 5),
            reviewService.getReviewsByStoreId(id, 0, 5)
        ]);

        allData && this.setState({
            store: allData[0].data.store,
            images: allData[0].data.images,
            reviews: allData[1].data
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
        return this.state.images.data.map(img => {
            return <div className='img' key={img.id}>
                <Image
                    src={img.src}
                    alt={this.state.store.store_name} />
            </div>
        });
    };

    renderReviews = () => {
        return this.state.reviews.data.map(review => {
            return <div className='review' key={review.id}>
                <ReviewCard
                    imgSrc={review.img_src}
                    imgAlt={review.title}
                    title={review.title}
                    description={review.description}
                />
            </div>
        });
    };

    addArrow = (img) => {
        return <button className='btn-arrow'>{img}</button>;
    };

    render() {
        let id = this.props.match.params.id;
        let token = false // Test 용 토큰
        let toReserve = <Link to={`/stores/${id}/${token}`}><button className='btn-reserve'>예약하기</button></Link>;
        let toLogin = <Link to={`/stores/${id}/login`}><button className='btn-reserve'>로그인 후 예약하기</button></Link>;
        let imageTitle = (this.state.images.data && `${this.state.store.store_name}의 분위기 넘치는 사진들`) || '';

        return (
            <Modal to={'/stores'}>
                <article className='store-detail'>
                    {(token && toReserve) || toLogin}
                    <SectionDivider />
                    <section className='store-info'>
                        {this.state.store && this.renderStoreCard()}
                    </section>
                    <SectionDivider />
                    <TitleBox contents={imageTitle} />
                    <section className='img-list'>
                        {this.state.images.data && this.renderImages()}
                        {this.state.images.count > 5 && this.addArrow('>')}
                    </section>
                    <SectionDivider />
                    <button className='btn-review'>리뷰</button>
                    <button className='btn-qna'>QnA</button>
                    <section className='review-list'>
                        {(this.state.reviews.data && this.renderReviews()) || '등록된 리뷰가 없습니다. 가보신적이 있으신가요? 리뷰를 작성해보세요!'}
                        {this.state.reviews.count > 5 && this.addArrow('>')}
                    </section>
                </article>
            </Modal>
        );
    }
}

export default StoreDetail