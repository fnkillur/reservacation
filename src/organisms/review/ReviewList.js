import React, {Component} from 'react';
import './ReviewList.scss';
import {Link} from 'react-router-dom';
import ReviewCard from './ReviewCard';
import Pagination from '../Pagination';
import * as reviewService from '../../_common/services/review.service';
import {fetchReviewList} from "../../actions";

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
    // this.props.fetchReviewList(this.props.id, this.props.reviewPageNo, this.props.perPageNo);
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
    return (
      (this.state.reviews.data && this.state.reviews.data.map(review => {
        return (
          <article className='review' key={review.id}>
            <Link to={{
              pathname: `/stores/${this.props.id}/reviews/${review.id}`,
              search: this.props.callbackUrl
            }}>
              <ReviewCard
                imgSrc={review.img_src}
                imgAlt={review.title}
                description={review.description}
              />
            </Link>
          </article>
        )
      })) || <div>등록된 리뷰가 없습니다. 리뷰를 남겨주세요!</div>
    );
  };

  render() {
    return (
      <div className='review-list'>
        <Pagination
          reviewPageNo={this.state.reviewPageNo}
          perPageNo={this.state.perPageNo}
          totalPageCount={this.state.reviews.totalPageCount}
          onClick={this.fetchStoreReviews}>
          {this.renderReviews()}
        </Pagination>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reviewList: state.reviewList
});
const mapDispatchToProps = dispatch => ({
  fetchReviewList: (id, pageNo, perPageNo) => dispatch(fetchReviewList(id, pageNo, perPageNo))
});

export default ReviewList;