import React from 'react';
import './Auth.scss';
import {Link} from 'react-router-dom';
import TitleBox from '../components/TitleBox';
import AuthForm from '../organisms/AuthForm';
import DescriptionBox from '../components/DescriptionBox';
import SectionDivider from '../components/SectionDivider';
import {login, setLogin, register} from "../_common/services/user.service";
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
        onLogin(formData);
        break;
      case 'register':
        onRegister(formData);
        break;
      default:
        console.error('url 오류');
        break;
    }
  };

  const initUser = () => {
    onChange({email: '', password: '', rePassword: '', phone: '', name: ''});
  };

  const callbackUrl = (location.search && location.search.replace(new RegExp('\\?.+url=', 'g'), '')) || '';

  const onLogin = async user => {
    try {
      const res = await login(user);
      setLogin(res.data);

      initUser();
      window.location.href = callbackUrl || '/stores';
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const onRegister = async user => {
    try {
      const res = await register(user);
      alert(res.data.message);

      initUser();
      window.location.href = (callbackUrl && `/auth/login?callback_url=${callbackUrl}`) || '/auth/login';
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const renderFooter = (desc, pathname, btnName) => {
    return (
      <section className='link-box'>
        <section className='link-info'>
          <div><DescriptionBox contents={desc}/></div>
          <Link to={{pathname, search: `callback_url=${callbackUrl}`}}>
            <button className='btn-link'>{btnName}</button>
          </Link>
        </section>
        <SectionDivider/>
      </section>
    );
  };

  return (
    <section className='auth'>
      <header className='title'>
        <Link to='/stores'>
          <TitleBox contents='Reservacation'/>
        </Link>
      </header>
      <AuthForm
        form={formFactory[kind]}
        user={user}
        onChange={onChange}
        onCreate={handleCreate}
      />
      <footer className='link-list'>
        {(kind !== 'login' && renderFooter('이미 가입하셨나요?', '/auth/login', '로그인')) || ''}
        {(kind !== 'register' && renderFooter('새로 오셨나요?', '/auth/register', '회원가입')) || ''}
        {(kind !== 'findPassword' && renderFooter('비밀번호를 잊으셨나요?', '/auth/findPassword', '비밀번호 찾기')) || ''}
      </footer>
    </section>
  );
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  onChange: input => dispatch(inputUserInfo(input))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);