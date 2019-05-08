import React, {PureComponent} from 'react';
import './ReviewList.scss';
import {Link} from 'react-router-dom';
import ReviewCard from './ReviewCard';
import Pagination from '../Pagination';

class ReviewList extends PureComponent {

  renderReviews = () => {
    const {reviewList, storeId, callbackUrl} = this.props;

    return (
      (reviewList.data.map(review => {
        return (
          <article className='review' key={review.id}>
            <Link to={{
              pathname: `/stores/${storeId}/reviews/${review.id}`,
              search: callbackUrl
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
    const {activePage, reviewList, pageAction} = this.props;

    return (
      <div className='review-list'>
        <Pagination
          activePage={activePage}
          totalPageCount={reviewList.totalPageCount}
          pageAction={pageAction}
        >
          {this.renderReviews()}
        </Pagination>
      </div>
    );
  }
}

export default ReviewList;