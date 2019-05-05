import React, {PureComponent} from 'react';
import './ReviewList.scss';
import {Link} from 'react-router-dom';
import ReviewCard from './ReviewCard';
import Pagination from '../Pagination';

class ReviewList extends PureComponent {

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
          onClick={this.props.pageAction}>
          {this.renderReviews()}
        </Pagination>
      </div>
    );
  }
}

export default ReviewList;