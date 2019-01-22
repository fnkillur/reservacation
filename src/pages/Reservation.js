import React, { Component } from 'react';
import './Reservation.scss';
import TitleBox from '../components/TitleBox';
import Modal from '../components/Modal';

class Reservation extends Component {

    componentDidMount() {
        this.getWaitingCount();
    }

    getWaitingCount = async () => {
        let watiingCount = await this.callApi();
        this.setState({
            watiingCount
        });
    };

    callApi = () => {
        // Api 호출 Test Code
        return 7;
    };

    render() {
        return (
            <Modal to={'/stores'}>
                <article className='reservation'>
                    <button className='btn-pay'>결제하기</button>
                    <section className='wait-people'>
                        <TitleBox contents='예상 대기 인원' />
                        <div className='wait-count'>{(this.state && this.state.watiingCount) || ''}</div>
                    </section>
                    <section>

                    </section>
                </article>
            </Modal>
        );
    }
}

export default Reservation;