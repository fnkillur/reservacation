import React from 'react';
import './Auth.scss';
import {Link, Route, Switch} from 'react-router-dom';
import TitleBox from '../components/TitleBox';
import DescriptionBox from '../components/DescriptionBox';
import SectionDivider from '../components/SectionDivider';
import LoginForm from '../organisms/auth/LoginForm';
import RegisterForm from '../organisms/auth/RegisterForm';
import FindPasswordForm from '../organisms/auth/FindPasswordForm';

const Auth = ({location}) => {

  const kind = location.pathname.split('/').pop();
  const callbackUrl = (location.search && location.search.replace(new RegExp('\\?.+url=', 'g'), '')) || '';

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
      <header className='header'>
        <Link to='/stores'>
          <TitleBox contents='Reservacation'/>
        </Link>
      </header>
      <Switch>
        <Route path='/auth/login' component={LoginForm}/>
        <Route path='/auth/register' component={RegisterForm}/>
        <Route path='/auth/findPassword' component={FindPasswordForm}/>
      </Switch>
      <footer className='footer'>
        {(kind !== 'login' && renderFooter('이미 가입하셨나요?', '/auth/login', '로그인')) || ''}
        {(kind !== 'register' && renderFooter('새로 오셨나요?', '/auth/register', '회원가입')) || ''}
        {(kind !== 'findPassword' && renderFooter('비밀번호를 잊으셨나요?', '/auth/findPassword', '비밀번호 찾기')) || ''}
      </footer>
    </section>
  );
};

export default Auth;