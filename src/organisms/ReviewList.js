import React, { Component } from 'react';
import './ReviewList.scss';
import ReviewCard from '../organisms/ReviewCard';
import Pagination from './Pagination';
import * as reviewService from '../_common/services/review.service';

class ReviewList extends Component {

    state = {
        reviews: '',
        reviewPageNo: this.props.reviewPageNo,
        perPageNo: this.props.perPageNo
    };

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.reviews !== this.state.reviews;
    }

    componentDidMount() {
        this.fetchStoreReviews(this.props.reviewPageNo, this.props.perPageNo);
    }

    fetchStoreReviews = async (reviewPageNo, perPageNo) => {
        let res = await reviewService.getReviewsByStoreId(this.props.id, reviewPageNo - 1, perPageNo);

        this.setState({
            reviews: res.data,
            reviewPageNo,
            perPageNo
        });
        
        this.props.pushQueryString(reviewPageNo, perPageNo);
    };

    renderReviews = () => {
        return (this.state.reviews.totalPageCount
            && this.state.reviews.data.map(review => {
                return <div className='review' key={review.id}>
                    <ReviewCard
                        imgSrc={review.img_src}
                        imgAlt={review.title}
                        description={review.description}
                    />
                </div>
            })) || <div>등록된 리뷰가 없습니다. 리뷰를 남겨주세요!</div>;
    };

    render() {
        return (
            <div className='review-list'>
                <Pagination
                    reviewPageNo={this.state.reviewPageNo}
                    perPageNo={this.state.perPageNo}
                    totalPageCount={this.state.reviews.totalPageCount}
                    onClick={this.fetchStoreReviews}>
                    {this.state.reviews && this.renderReviews()}
                </Pagination>
            </div>
        );
    }
}

export default ReviewList;