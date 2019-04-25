import React, {Component} from 'react';
import './StoreDetail.scss';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import Image from '../components/Image';
import TitleBox from '../components/TitleBox';
import SectionDivider from '../components/SectionDivider';
import Modal from '../components/Modal';
import StoreCard from '../organisms/StoreCard';
import ReviewForm from '../organisms/ReviewForm';
import ReviewList from '../organisms/ReviewList';
import * as userService from '../_common/services/user.service';
import * as reviewService from '../_common/services/review.service';
import {connect} from 'react-redux';
import {fetchStore, toggleReview} from "../actions";

class StoreDetail extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.store !== this.props.store)
      || (nextProps.isOpen !== this.props.isOpen);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    id && this.props.fetchStore(id);
  }

  renderReserveButton = (pathname, search, btnName) => {
    return (
      <Link to={{pathname, search}}>
        <button className='btn-reserve'>{btnName}</button>
      </Link>
    );
  };

  renderStoreCard = () => {
    const store = this.props.store.info;

    if (store) {
      return (
        <StoreCard
          imgSrc={store.img_src}
          imgAlt={store.store_name}
          name={store.store_name}
          address={store.address + store.detail_address}
          tel={store.store_tel}
          description={store.store_description}
          whiteSpace='pre-wrap'
        />
      );
    }
  };

  renderImages = () => {
    const images = this.props.store.images;

    if (images) {
      return images.map(img => {
        return (
          <div className='img' key={img.id}>
            <Image
              src={img.src}
              alt={this.props.store.info.store_name}/>
          </div>
        );
      });
    }
  };

  pushQueryString = (reviewPageNo, perPageNo) => {
    this.props.history.push({
      search: `?reviewPageNo=${reviewPageNo}&perPageNo=${perPageNo}`
    });
  };

  renderReviewButton = token => {
    if (token) {
      return (
        <button
          className='btn-review'
          onClick={this.toggleReviewForm}>
          {(!this.props.isOpen && '리뷰 작성하기') || '작성 취소'}
        </button>
      );
    }
  };

  toggleReviewForm = () => {
    this.props.toggleReview();
  };

  handleCreate = async (review) => {
    try {
      let res = await reviewService.writeReview(review);
      alert(res.data.message);
      window.location.reload();
    } catch (error) {
      error.response.data && alert(error.response.data.message);
    }
  };

  render() {
    let id = this.props.match.params.id;
    let query = queryString.parse(this.props.location.search);
    let token = userService.identifyLogin();
    let callbackUrl = `callback_url=/stores/${id}?reviewPageNo=${query.reviewPageNo}&perPageNo=${query.perPageNo}`;

    return (
      <Modal hasBtnBack={false}>
        <article className='store-detail'>
          {(token && this.renderReserveButton(`/stores/${id}/reserve`, callbackUrl, '예약하기'))
          || this.renderReserveButton('/auth/login', callbackUrl, '로그인 후 예약하기')}
          <SectionDivider/>
          <section className='store-info'>
            {this.renderStoreCard()}
          </section>
          <SectionDivider/>
          <TitleBox contents={(this.props.store.images && `${this.props.store.info.store_name}의 분위기 넘치는 사진들`) || ''}/>
          <section className='img-list'>
            {this.renderImages()}
          </section>
          <SectionDivider/>
          <TitleBox contents={(this.props.store.images && `${this.props.store.info.store_name}의 생생한 리뷰들`) || ''}/>
          <section className='store-reviews'>
            <ReviewList
              id={id}
              reviewPageNo={query.reviewPageNo}
              perPageNo={query.perPageNo}
              pushQueryString={this.pushQueryString}
              callbackUrl={callbackUrl}/>
          </section>
          <SectionDivider/>
          <section className='review-button'>
            {this.renderReviewButton(token)}
          </section>
          <section className={(this.props.isOpen && 'review-create') || 'review-hidden'}>
            <ReviewForm storeId={id} onCreate={this.handleCreate}/>
          </section>
        </article>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  store: state.store,
  isOpen: state.isOpenReview
});

const mapDispatchToProps = dispatch => ({
  fetchStore: id => dispatch(fetchStore(id)),
  toggleReview: () => dispatch(toggleReview())
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreDetail);