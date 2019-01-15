import React, { Component } from 'react';
import './StoreDetail.scss';
import { Link } from 'react-router-dom';
import Image from '../components/Image';
import TitleBox from '../components/TitleBox';
import SectionDivider from '../components/SectionDivider';
import Modal from '../components/Modal';
import StoreCard from '../organisms/StoreCard';
import ReviewCard from '../organisms/ReviewCard';
import * as storeService from '../_common/services/store.serivce';

class StoreDetail extends Component {

    componentDidMount() {
        let id = this.props.match.params.id;
        id && this.fetchStoreDetail(id);
    }

    fetchStoreDetail = async (id) => {
        let ress = await Promise.all([
            storeService.getStoreById(id),
        ]);

        this.setState({
            store: ress[0].data[0],
        });
    }

    getImages = async () => {
        let images = await this.callApiImages();
        this.setState({
            images
        });
    };

    callApiImages = () => {
        // Api 호출 Test Code
        return [
            {
                src: 'https://www.jeongdong.or.kr/static/portal/img/HKPU_04_04_pic1.jpg',
                alt: '분위기있는사진1',
            }, {
                src: 'https://www.jeongdong.or.kr/static/portal/img/HKPU_04_04_pic1.jpg',
                alt: '분위기있는사진2',
            }, {
                src: 'https://www.jeongdong.or.kr/static/portal/img/HKPU_04_04_pic1.jpg',
                alt: '분위기있는사진3',
            }, {
                src: 'https://www.jeongdong.or.kr/static/portal/img/HKPU_04_04_pic1.jpg',
                alt: '분위기있는사진4',
            }
        ];
    };

    renderStoreCard = () => {
        let store = this.state.store;
        return <StoreCard
            imgSrc={store.imgSrc}
            imgAlt={store.name}
            name={store.name}
            address={store.address}
            tel={store.phone}
            description={store.description}
        />;
    };

    renderImgaes = () => {
        return this.state.images.map((img, i) => {
            return <div className='img' key={i}>
                <Image
                    src={img.src}
                    alt={img.alt} />
            </div>
        });
    };

    renderReviews = () => {
        let reviews = (this.state.store.Reviews.length
            && this.state.store.Reviews.map((review, i) => {
                return <div className='review' key={i}>
                    <ReviewCard
                        imgSrc={review.imgSrc}
                        imgAlt={review.title}
                        title={review.title}
                        description={review.description}
                    />
                </div>
            })) || `등록된 리뷰가 없습니다. 가보신적이 있으신가요? 리뷰를 작성해보세요!`;
        return reviews;
    };

    render() {
        let id = this.props.match.params.id;
        let token = false // Test 용 토큰
        let toReserve = <Link to={`/stores/${id}/${token}`}><button className='btn-reserve'>예약하기</button></Link>;
        let toLogin = <Link to={`/stores/${id}/login`}><button className='btn-reserve'>로그인 후 예약하기</button></Link>;
        let name = this.state && this.state.store && this.state.store.name;
        let isStore = this.state && this.state.store;
        let isImages = this.state && this.state.images;

        return (
            <Modal to={'/stores'}>
                <article className='store-detail'>
                    {(token && toReserve) || toLogin}
                    <SectionDivider />
                    <section className='store-info'>
                        {isStore && this.renderStoreCard()}
                    </section>
                    <SectionDivider />
                    <TitleBox contents={`${name}의 분위기 넘치는 사진들`} />
                    <section className='img-list'>
                        {isImages && this.renderImgaes()}
                    </section>
                    <SectionDivider />
                    <button className='btn-review'>리뷰</button>
                    <button className='btn-qna'>QnA</button>
                    <section className='review-list'>
                        {isStore && this.renderReviews()}
                    </section>
                </article>
            </Modal>
        );
    }
}

export default StoreDetail