import React, { Component } from 'react';
import './StoreDetail.scss';
import { Link } from 'react-router-dom';
import Image from '../components/Image';
import TitleBox from '../components/TitleBox';
import SectionDivider from '../components/SectionDivider';
import Modal from '../components/Modal';
import StoreCard from '../organisms/StoreCard';
import ReviewCard from '../organisms/ReviewCard';

class StoreDetail extends Component {

    componentDidMount() {
        this.getStore();
        this.getImages();
        this.getReviews();
    }

    getStore = async () => {
        let store = await this.callApiStore();
        this.setState({
            store
        });
    };

    callApiStore = () => {
        // Api 호출 Test Code
        return {
            imgSrc: 'https://www.jeongdong.or.kr/static/portal/img/HKPU_04_04_pic1.jpg',
            imgAlt: '스타벅스 아주대점',
            name: '스타벅스 아주대점',
            address: '경기도 수원시 팔달구 우만2동 월드컵로 205',
            tel: '031-215-4516',
            description: '카페',
            no: 1,
        };
    };

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

    getReviews = async () => {
        let reviews = await this.callApiReview();
        this.setState({
            reviews
        });
    };

    callApiReview = () => {
        // Api 호출 Test Code
        return [
            {
                imgSrc: 'https://www.jeongdong.or.kr/static/portal/img/HKPU_04_04_pic1.jpg',
                imgAlt: '리뷰이미지1',
                title: '맛있어요.',
                description: '뻥이야 존나맛없어.',
            }, {
                imgSrc: 'https://www.jeongdong.or.kr/static/portal/img/HKPU_04_04_pic1.jpg',
                imgAlt: '리뷰이미지2',
                title: '맛없네요 시발',
                description: '이게 음식이야? 장사하기싫어?',
            }
        ];
    };

    renderStoreCard = () => {
        let store = this.state.store;
        return <StoreCard
            imgSrc={store.imgSrc}
            imgAlt={store.imgAlt}
            name={store.name}
            address={store.address}
            tel={store.tel}
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
        return this.state.reviews.map((review, i) => {
            return <div className='review' key={i}>
                <ReviewCard
                    imgSrc={review.imgSrc}
                    imgAlt={review.imgAlt}
                    title={review.title}
                    description={review.description}
                />
            </div>
        });
    };

    render() {
        let no = this.props.match.params.no;
        let name = this.state && this.state.store && this.state.store.name;
        let isStore = this.state && this.state.store;
        let token = 'test' // Test 용 토큰
        let isImages = this.state && this.state.images;
        let isReviews = this.state && this.state.reviews;

        return (
            <Modal to={'/stores'}>
                <article className='store-detail'>
                    <Link to={`/stores/${no}/${token}`}><button className='btn-reserve'>예약하기</button></Link>
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
                        {isReviews && this.renderReviews()}
                    </section>
                </article>
            </Modal>
        );
    }
}

export default StoreDetail