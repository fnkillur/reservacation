import React, { Component } from 'react';
import StoreCard from './StoreCard';
import Image from '../components/Image';
import TitleBox from '../components/TitleBox';
import ReviewCard from './ReviewCard';
import PropTypes from 'prop-types';
import './StoreDetail.scss';

class StoreDetail extends Component {
    constructor(prop) {
        super(prop);
        this.state = { images: [], reviews: [] };
    }

    componentDidMount() {
        this.getImages();
        this.getReviews();
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
        const { imgSrc, imgAlt, name, address, tel, description } = this.props;

        return (
            <article className='store-detail'>
                <button className='btn-reserve'>예약하기</button>
                <section className='store-info'>
                    <StoreCard
                        imgSrc={imgSrc}
                        imgAlt={imgAlt}
                        name={name}
                        address={address}
                        tel={tel}
                        description={description}
                    />
                </section>
                <TitleBox contents={`${name}의 분위기 넘치는 사진들`} />
                <section className='img-list'>
                    {this.state.images ? this.renderImgaes() : ''}
                </section>
                <button className='btn-review'>리뷰</button>
                <button className='btn-qna'>QnA</button>
                <section className='review-list'>
                    {this.state.reviews ? this.renderReviews() : ''}
                </section>
            </article>
        );
    }
}

StoreDetail.propTypes = {
    imgSrc: PropTypes.string,
    imgAlt: PropTypes.string,
    name: PropTypes.string,
    address: PropTypes.string,
    tel: PropTypes.string,
    description: PropTypes.string,
};

export default StoreDetail