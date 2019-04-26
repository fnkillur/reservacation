import React, {Component} from 'react';
import './ReviewDetail.scss';
import Modal from '../components/Modal';
import TitleBox from '../components/TitleBox';
import DescriptionBox from '../components/DescriptionBox';
import Image from '../components/Image';
import * as reviewService from '../_common/services/review.service';
import SectionDivider from '../components/SectionDivider';

class ReviewDetail extends Component {

  state = {
    review: ''
  };

  componentDidMount() {
    let reviewId = this.props.match.params.reviewId;
    reviewId && this.fetchReviewDetail(reviewId);
  }

  fetchReviewDetail = async (reviewId) => {
    try {
      let res = await reviewService.getReview(reviewId);
      this.setState({
        review: res.data
      });
    } catch (error) {
      console.error(error);
    }
  };

  getCallbackUrl = () => {
    let queryParams = this.props.location.search;
    return queryParams && queryParams.replace(new RegExp('\\?.+url=', 'g'), '');
  };

  render() {
    return (
      <Modal to={this.getCallbackUrl()} hasBtnBack={true}>
        <article className='review-detail'>
          <section className='title'>
            <TitleBox contents='상세 리뷰'/>
          </section>
          <section className='review-info'>
            {this.state.review && new Date(this.state.review.createdAt).toISOString().split('T')[0] + ' (작성)'}
          </section>
          <SectionDivider/>
          <section className='review-image'>
            <Image src={this.state.review && this.state.review.img_src}/>
          </section>
          <section className='review-contents'>
            <DescriptionBox contents={this.state.review && this.state.review.description}/>
          </section>
        </article>
      </Modal>
    );
  }
}

export default ReviewDetail;