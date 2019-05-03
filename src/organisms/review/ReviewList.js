import React, {Component} from 'react';
import {connect} from 'react-redux';
import './ReviewList.scss';
import {Link} from 'react-router-dom';
import ReviewCard from './ReviewCard';
import Pagination from '../Pagination';
import {fetchReviewList} from "../../actions";

class ReviewList extends Component {

  componentDidMount() {
    this.props.fetchReviewList(this.props.id, this.props.reviewPageNo, this.props.perPageNo);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.reviewList !== this.props.reviewList;
  }

  fetchStoreReviews = (reviewPageNo, perPageNo) => {
    this.props.fetchReviewList(this.props.id, reviewPageNo, perPageNo);
    this.props.pushQueryString(reviewPageNo, perPageNo);
  };

  renderReviews = () => {
    return (
      (this.props.reviewList.data.map(review => {
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
          reviewPageNo={this.props.reviewPageNo}
          perPageNo={this.props.perPageNo}
          totalPageCount={this.props.reviewList.totalPageCount}
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);