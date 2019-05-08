import React, {PureComponent} from 'react';
import './ReviewDetail.scss';
import {connect} from 'react-redux';
import Modal from '../components/Modal';
import TitleBox from '../components/TitleBox';
import DescriptionBox from '../components/DescriptionBox';
import Image from '../components/Image';
import SectionDivider from '../components/SectionDivider';
import {fetchReviewDetail} from '../actions';

class ReviewDetail extends PureComponent {

  componentDidMount() {
    const {match, fetchReview} = this.props;
    fetchReview(match.params.reviewId);
  }

  getCallbackUrl = () => {
    const queryParams = this.props.location.search;
    return queryParams && queryParams.replace(new RegExp('\\?.+url=', 'g'), '');
  };

  render() {
    const {review} = this.props;

    if (!review) return '';

    return (
      <Modal to={this.getCallbackUrl()} hasBtnBack={true}>
        <article className='review-detail'>
          <section className='title'>
            <TitleBox contents='상세 리뷰'/>
          </section>
          <section className='review-info'>
            {new Date(review.createdAt).toISOString().split('T')[0] + ' (작성)'}
          </section>
          <SectionDivider/>
          <section className='review-image'>
            <Image src={review.img_src}/>
          </section>
          <section className='review-contents'>
            <DescriptionBox contents={review.description}/>
          </section>
        </article>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  review: state.reviewDetail
});
const mapDispatchToProps = dispatch => ({
  fetchReview: id => dispatch(fetchReviewDetail(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDetail);