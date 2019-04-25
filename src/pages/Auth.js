import React from 'react';
import './Auth.scss';
import {Link} from 'react-router-dom';
import TitleBox from '../components/TitleBox';
import AuthForm from '../organisms/AuthForm';
import DescriptionBox from '../components/DescriptionBox';
import SectionDivider from '../components/SectionDivider';
import * as userService from '../_common/services/user.service';
import {connect} from 'react-redux';
import {inputUserInfo} from '../actions';

const Auth = ({location, match, user, onChange}) => {

  const inputList = [{
    name: 'email',
    value: user.email,
    placeholder: 'email@example.com'
  }, {
    name: 'password',
    value: user.password,
    placeholder: '비밀번호',
    type: 'password'
  }, {
    name: 'rePassword',
    value: user.rePassword,
    placeholder: '비밀번호 확인',
    type: 'password'
  }, {
    name: 'phone',
    value: user.phone,
    placeholder: '연락처'
  }, {
    name: 'name',
    value: user.name,
    placeholder: '이름'
  }];

  const formFactory = {
    findPassword: {
      inputList: inputList.slice(0, 1),
      title: '이메일로 비밀번호 찾기'
    },
    login: {
      inputList: inputList.slice(0, 2),
      title: '로그인'
    },
    register: {
      inputList: [...inputList],
      title: '회원가입'
    }
  };

  const kind = match.path.split('/').pop();

  const handleCreate = (formData) => {
    switch (kind) {
      case 'findPassword':
        //TODO: 패스워드 찾기 로직
        break;
      case 'login':
        login(formData);
        break;
      case 'register':
        register(formData);
        break;
      default:
        console.error('url 오류');
        break;
    }
  };

  const initUser = () => {
    onChange({email: '', password: '', rePassword: '', phone: '', name: ''});
  };

  const getCallbackUrl = () => {
    return (location.search && location.search.replace(new RegExp('\\?.+url=', 'g'), '')) || '';
  };

  const login = async user => {
    try {
      const res = await userService.login(user);

      userService.setLogin(res.data);
      initUser();
      window.location.href = getCallbackUrl() || '/storeList';
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const register = async user => {
    const callbackUrl = getCallbackUrl();

    try {
      const res = await userService.register(user);

      alert(res.data.message);
      initUser();
      window.location.href = (callbackUrl && `/auth/login?callback_url=${callbackUrl}`) || '/auth/login';
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const renderFooter = () => {
    const callbackUrl = getCallbackUrl();

    return (
      <footer className='link-list'>
        <section className='link-box'>
          <section className='description-box'>
            <DescriptionBox contents='새로 오셨나요?'/>
          </section>
          <Link to={{pathname: '/auth/register', search: `callbackUrl && callback_url=${callbackUrl}`}}>
            <button className='btn-link'>회원가입</button>
          </Link>
        </section>
        <SectionDivider/>
        <section className='link-box'>
          <section className='description-box'>
            <DescriptionBox contents='비밀번호를 잊으셨나요?'/>
          </section>
          <Link to={{pathname: '/auth/findPassword', search: `callback_url=${callbackUrl}`}}>
            <button className='btn-link'>비밀번호 찾기</button>
          </Link>
        </section>
      </footer>
    );
  };

  return (
    <article className='auth'>
      <header className='title'>
        <section className='logo'>
          <Link to='/stores'>
            <img src='' alt='로고'/>
          </Link>
        </section>
        <TitleBox contents='Reservacation'/>
      </header>
      <AuthForm
        form={formFactory[kind]}
        user={user}
        onChange={onChange}
        onCreate={handleCreate}
      />
      {(kind === 'login' && renderFooter()) || ''}
    </article>
  );
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  onChange: input => dispatch(inputUserInfo(input))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);