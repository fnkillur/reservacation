import React, { Component } from 'react';
import './Auth.scss';
import { Link } from 'react-router-dom';
import TitleBox from '../components/TitleBox';
import AuthForm from '../organisms/AuthForm';
import DescriptionBox from '../components/DescriptionBox';
import SectionDivider from '../components/SectionDivider';
import * as userService from '../_common/services/user.service';

class Auth extends Component {

    getCallbackUrl = () => {
        let queryParams = this.props.location.search;
        return queryParams && queryParams.replace(new RegExp('\\?.+url=', 'g'), '');
    };

    handleCreate = (formData) => {
        let kind = this.props.match.path.split('/').pop();

        switch (kind) {
            case 'findPassword':
                //TODO: 패스워드 찾기 로직
                break;
            case 'login':
                this.login(formData);
                break;
            case 'register':
                this.register(formData);
                break;
            default:
                console.log('url 오류');
                break;
        }
    };

    login = async (formData) => {
        try {
            let res = await userService.login(formData);
            userService.setLogin(res.data);
            let toUrl = this.getCallbackUrl() || '/stores';
            window.location.href = toUrl;
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    register = async (formData) => {
        let callbackUrl = this.getCallbackUrl();
        try {
            let res = await userService.register(formData);
            alert(res.data.message);
            let toUrl = (callbackUrl && `/auth/login?callback_url=${callbackUrl}`) || '/auth/login';
            window.location.href = toUrl;
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    renderBtnLink = () => {
        let callbackUrl = this.getCallbackUrl();

        return <section className='link-list'>
            <section className='link-box'>
                <section className='description-box'>
                    <DescriptionBox contents={'새로 오셨나요?'} />
                </section>
                <Link to={{ pathname: '/auth/register', search: `callbackUrl && callback_url=${callbackUrl}` }}>
                    <button className='btn-link'>회원가입</button>
                </Link>
            </section>
            <SectionDivider />
            <section className='link-box'>
                <section className='description-box'>
                    <DescriptionBox contents={'비밀번호를 잊으셨나요?'} />
                </section>
                <Link to={{ pathname: '/auth/findPassword', search: `callback_url=${callbackUrl}` }}>
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
                formTitle = '이메일로 비밀번호 찾기';
                break;
            case 'login':
                formEndIndex = 2;
                formTitle = '로그인';
                break;
            case 'register':
                formEndIndex = 5;
                formTitle = '회원가입'
                break;
            default:
                console.log('url 오류');
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