import React, {Component} from 'react';
import './Reservation.scss';
import TitleBox from '../components/TitleBox';
import Modal from '../components/Modal';
import Input from '../components/Input';
import DescriptionBox from '../components/DescriptionBox';
import {bookStore} from '../_common/services/booking.service';
import {connect} from 'react-redux';
import {inputGuestCount, fetchReservationInfo} from '../actions';

class Reservation extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.guestCount !== this.props.guestCount
      || nextProps.reservationInfo !== this.props.reservationInfo;
  }

  componentDidMount() {
    this.props.fetchReservationInfo(this.props.match.params.id);
  }

  bookStore = async () => {
    if (!Number.isInteger(Number(this.props.guestCount)) || this.props.guestCount <= 0) {
      alert('정확한 인원을 입력해주세요.');
      return;
    }

    try {
      const res = await bookStore({
        storeId: this.props.match.params.id,
        customerCount: this.props.guestCount
      });
      alert(res.data.message);

      this.props.fetchMyReservation(this.props.match.params.id);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 406) alert(error.response.data.message);
    }
  };

  cancelBook = () => {
    alert('취소 기능 구현 중입니다... ㅜ.ㅜ');
  };

  handleChange = e => {
    this.props.onChange(e.target.value);
  };

  render() {
    const notice = [
      '예약이 취소되었습니다. 다음에 이용해주세요!',
      '가게에서 예약을 확인하고 있습니다. 잠시만 기다려주세요!',
      '예약이 접수되었습니다. 차례를 기다려주세요!',
      '차례가 되었습니다!',
      '예약 신청하기 버튼을 눌러 예약을 요청하세요!'
    ];

    return (
      <Modal to={this.props.location.search.replace(new RegExp('\\?.+url=', 'g'), '')} hasBtnBack={true}>
        <article className='reservation'>
          {this.props.reservationInfo.status === 4 &&
          <button className='btn-request' onClick={this.bookStore}>에약 신청하기</button>}
          {this.props.reservationInfo.status !== 4 &&
          <button className='btn-request' onClick={this.cancelBook}>에약 취소하기</button>}
          <section className='wait-people'>
            <TitleBox contents='예상 대기 팀'/>
            <div className='wait-count'>{this.props.reservationInfo.waitingCount}</div>
          </section>
          <section className='select-person'>
            <TitleBox contents='예약 인원 수'/>
            <section className='select-input'>
              <Input
                placeholder='0명'
                value={this.props.guestCount}
                onChange={this.handleChange}
                name='myTeamCount'/>
            </section>
          </section>
          <section className='reserve-notice'>
            <DescriptionBox contents={notice[this.props.reservationInfo.status]}/>
          </section>
        </article>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  guestCount: state.guestCount,
  reservationInfo: state.reservationInfo
});

const mapDispatchToProps = dispatch => ({
  onChange: input => dispatch(inputGuestCount(input)),
  fetchReservationInfo: id => dispatch(fetchReservationInfo(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Reservation);