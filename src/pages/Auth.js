import React, { Component } from 'react';
import './Auth.scss';
import { Link } from 'react-router-dom';
import TitleBox from '../components/TitleBox';
import AuthForm from '../organisms/AuthForm';
import DescriptionBox from '../components/DescriptionBox';
import SectionDivider from '../components/SectionDivider';

class Auth extends Component {

    handleCreate = (formData) => {
        console.log(formData);
    };

    renderBtnLink = () => {
        return <section className='link-list'>
            <section className='link-box'>
                <section className='description-box'>
                    <DescriptionBox contents={'새로 오셨나요?'} />
                </section>
                <Link to='/auth/register'>
                    <button className='btn-link'>회원가입</button>
                </Link>
            </section>
            <SectionDivider />
            <section className='link-box'>
                <section className='description-box'>
                    <DescriptionBox contents={'비밀번호를 잊으셨나요?'} />
                </section>
                <Link to='/auth/findPassword'>
                    <button className='btn-link'>비밀번호 찾기</button>
                </Link>
            </section>
        </section>;
    };

    render() {
        let kind = this.props.match.path.split('/').pop();
        let formEndIndex = 0;
        let formTitle = '';
        switch (kind) {
            case 'findPassword':
                formEndIndex = 1;
                formTitle = '비밀번호 찾기';
                break;
            case 'login':
                formEndIndex = 2;
                formTitle = '로그인';
                break;
            case 'register':
                formEndIndex = 5;
                formTitle = '회원가입'
                break;
        }

        return (
            <article className='auth'>
                <section className='title'>
                    <img src='' alt='로고' style={{ width: '100px', height: '100px' }} />
                    <TitleBox contents={`Reservacation ${formTitle}`} />
                </section>
                <AuthForm formEndIndex={formEndIndex} formTitle={formTitle} onCreate={this.handleCreate} />
                {kind === 'login' && this.renderBtnLink()}
            </article>
        );
    }
}

export default Auth;