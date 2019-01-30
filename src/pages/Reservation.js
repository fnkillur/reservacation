import React, { Component } from 'react';
import './Reservation.scss';
import TitleBox from '../components/TitleBox';
import Modal from '../components/Modal';
import Input from '../components/Input';
import DescriptionBox from '../components/DescriptionBox';
import * as bookingService from '../_common/services/booking.service';
import * as userService from '../_common/services/user.service';

class Reservation extends Component {

    state = {
        waitingCount: 0,
        myTeamCount: 0,
        status: ''
    }

    componentDidMount() {
        this.fetchWaitingCount();
    }

    fetchWaitingCount = async () => {
        let res = await bookingService.getWaitingCount(this.props.match.params.id);
        this.setState({
            waitingCount: res.data.waitingCount
        });
    };

    bookStore = () => {
        let form = {
            storeId: this.props.match.params.id,
            customerCount: this.state.myTeamCount
        };
        bookingService.bookStore(form)
            .then(res => {
                alert(res.data.message);
                console.log(res.data.booking.status);
                this.setState({
                    status: res.data.booking.status
                })
            }).catch(error => {
                error.response.status === 406 && alert(error.response.data.message);
            });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    render() {
        let notice = '';
        switch (this.state.status) {
            case 0:
                notice = '예약이 취소되었습니다. 다음에 이용해주세요!';
                break;
            case 1:
                notice = '가게에서 예약을 확인하고 있습니다. 잠시만 기다려주세요!';
                break;
            case 2:
                notice = '예약이 접수되었습니다. 차례를 기다려주세요!';
                break;
            case 3:
                notice = '차례가 되었습니다!';
                break;
            default:
                notice = '예약 신청하기 버튼을 눌러 예약을 요청하세요!';
                break;
        }

        return (
            <Modal to={'/stores'}>
                <article className='reservation'>
                    <button className='btn-request' onClick={this.bookStore}>에약 신청하기</button>
                    <section className='wait-people'>
                        <TitleBox contents='예상 대기 팀' />
                        <div className='wait-count'>{this.state.waitingCount}</div>
                    </section>
                    <section className='select-person'>
                        <TitleBox contents='예약 인원 수' />
                        <section className='select-input'>
                            <Input
                                placeholder='0명'
                                value={this.state.myTeamCount}
                                onChange={this.handleChange}
                                name='myTeamCount' />
                        </section>
                    </section>
                    <section className='reserve-notice'>
                        <DescriptionBox contents={notice} />
                    </section>
                </article>
            </Modal>
        );
    }
}

export default Reservation;