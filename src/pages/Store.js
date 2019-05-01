import React, {Component} from 'react';
import './Store.scss'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import queryString from 'query-string';
import Modal from '../components/Modal';
import SectionDivider from '../components/SectionDivider';
import StoreDetail from '../organisms/store/StoreDetail';
import ReviewList from '../organisms/review/ReviewList';
import ReviewForm from '../organisms/review/ReviewForm';
import {identifyLogin} from '../_common/services/user.service';
import {writeReview} from '../_common/services/review.service';
import {fetchStoreDetail} from '../actions';

class Store extends Component {

  state = {
    isOpen: false
  };

  componentDidMount() {
    this.props.fetchStoreDetail(this.props.match.params.id);
  }

  renderReserveButton = (pathname, search, btnName) => {
    return (
      <Link to={{pathname, search}}>
        <button className='btn-reserve'>{btnName}</button>
      </Link>
    );
  };

  pushQueryString = (reviewPageNo, perPageNo) => {
    this.props.history.push({
      search: `?reviewPageNo=${reviewPageNo}&perPageNo=${perPageNo}`
    });
  };

  toggleReviewForm = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleCreate = async review => {
    try {
      const res = await writeReview(review);
      alert(res.data.message);
      window.location.reload();
    } catch (error) {
      error.response.data && alert(error.response.data.message);
    }
  };

  render() {
    const id = this.props.match.params.id;
    const query = queryString.parse(this.props.location.search);
    const callbackUrl = `callback_url=/stores/${id}?reviewPageNo=${query.reviewPageNo}&perPageNo=${query.perPageNo}`;
    const token = identifyLogin();

    return (
      <Modal hasBtnBack={false}>
        <section className='store-page'>
          {(token && this.renderReserveButton(`/stores/${id}/reserve`, callbackUrl, '예약하기'))
          || this.renderReserveButton('/auth/login', callbackUrl, '로그인 후 예약하기')}
          <SectionDivider/>
          <StoreDetail
            storeDetail={this.props.storeDetail}
          />
          <section className='store-reviews'>
            <ReviewList
              id={id}
              reviewPageNo={query.reviewPageNo}
              perPageNo={query.perPageNo}
              pushQueryString={this.pushQueryString}
              callbackUrl={callbackUrl}/>
          </section>
          <section className='review-button'>
            {(token && <button className='btn-review' onClick={this.toggleReviewForm}>
              {(!this.state.isOpen && '리뷰 작성하기') || '작성 취소'}
            </button>) || ''}
          </section>
          <section className={(this.state.isOpen && 'review-create') || 'review-hidden'}>
            <ReviewForm storeId={id} onCreate={this.handleCreate}/>
          </section>
        </section>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  storeDetail: state.storeDetail
});

const mapDispatchToProps = dispatch => ({
  fetchStoreDetail: id => dispatch(fetchStoreDetail(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Store);