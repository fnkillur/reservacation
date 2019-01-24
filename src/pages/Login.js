import React, { Component } from 'react';
import './Login.scss';
import queryString from 'query-string';
import Modal from '../components/Modal';
import Input from '../components/Input';
import TitleBox from '../components/TitleBox';
import DescriptionBox from '../components/DescriptionBox';

class Login extends Component {

    state = {
        email: '',
        password: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

    };

    render() {
        let id = this.props.match.params.id;
        let callback_url = this.props.location.search.replace(new RegExp('\\?.+url=', 'g'), '');
        return (
            <Modal to={callback_url}>
                <article className='login'>
                    <section className='title'>
                        <img src='' alt='로고' style={{width: '100px', height: '100px'}} />
                        <TitleBox contents={`Reservacation 로그인`} />
                    </section>
                    <form onSubmit={this.handleSubmit}>
                        <section className='email'>
                            <TitleBox contents='Email' />
                            <Input
                                placeholder='email@example.com'
                                value={this.state.email}
                                onChange={this.handleChange}
                                name='email'
                            />
                        </section>
                        <section className='password'>
                            <TitleBox contents='Password' />
                            <Input
                                placeholder='비밀번호'
                                value={this.state.password}
                                onChange={this.handleChange}
                                name='password'
                            />
                        </section>
                        <button type='submit' className='btn-submit'>로그인</button>
                    </form>
                    <section className='sign-up'>
                        <DescriptionBox contents={'새로 오셨나요?'} />
                        <button className='btn-sign-up'>회원가입</button>
                    </section>
                </article>
            </Modal>
        );
    }
}

export default Login;