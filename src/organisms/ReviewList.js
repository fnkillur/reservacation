import React, { Component } from 'react';
import './ReviewList.scss';
import ReviewCard from '../organisms/ReviewCard';
import Pagination from './Pagination';
import * as reviewService from '../_common/services/review.service';

class ReviewList extends Component {

    state = {
        reviews: ''
    }

    componentDidMount() {
        this.fetchStoreReviews(this.props.reviewPageNo, this.props.perPageNo);
    }

    fetchStoreReviews = async (reviewPageNo, perPageNo) => {
        let res = await reviewService.getReviewsByStoreId(this.props.id, reviewPageNo, perPageNo);

        this.setState({
            reviews: res.data,
        });

        this.props.pushQueryString(reviewPageNo, perPageNo);
    }

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

    render() {
        return (
            <div className='review-list'>
                <Pagination
                    pageNo={this.props.reviewPageNo}
                    perPageNo={this.props.perPageNo}
                    totalPageCount={this.state.reviews.totalPageCount}
                    onClick={this.fetchStoreReviews}>
                    {this.state.reviews && this.renderReviews()}
                </Pagination>
            </div>
        );
    }
}

export default ReviewList;