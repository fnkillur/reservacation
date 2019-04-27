import React from 'react';
import {connect} from 'react-redux';
import Input from '../../components/Input';
import {clearFieldAuth, updateFieldAuth} from "../../actions";
import {register} from "../../_common/services/user.service";

const RegisterForm = ({location, user, updateField, clear}) => {

  const handleSubmit = e => {
    e.preventDefault();

    if (user.password !== user.rePassword) {
      alert('패스워드를 확인해주세요.');
      return;
    }

    onRegister();
  };

  const onRegister = async () => {
    try {
      const res = await register(user);
      alert(res.data.message);
      clear();
      const callbackUrl = location.search.replace(new RegExp('\\?.+url=', 'g'), '');
      window.location.href = (callbackUrl && `/auth/login?callback_url=${callbackUrl}`) || '/auth/login';
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleChange = e => {
    updateField(e.target.name, e.target.value);
  };

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <div className='form-inner'>
        <Input
          name='email'
          type='text'
          value={user.email}
          onChange={handleChange}
          placeholder='email@example.com'
          required={true}
        />
      </div>
      <div className='form-inner'>
        <Input
          name='password'
          type='password'
          value={user.password}
          onChange={handleChange}
          placeholder='비밀번호'
          required={true}
        />
      </div>
      <div className='form-inner'>
        <Input
          name='rePassword'
          type='password'
          value={user.rePassword}
          onChange={handleChange}
          placeholder='비밀번호'
          required={true}
        />
      </div>
      <div className='form-inner'>
        <Input
          name='name'
          type='text'
          value={user.name}
          onChange={handleChange}
          placeholder='이름'
          required={true}
        />
      </div>
      <div className='form-inner'>
        <Input
          name='phone'
          type='text'
          value={user.phone}
          onChange={handleChange}
          placeholder='연락처'
          required={true}
        />
      </div>
      <button type='submit' className='form-inner btn-submit'>회원가입</button>
    </form>
  );
};

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  updateField: (key, value) => dispatch(updateFieldAuth(key, value)),
  clear: () => dispatch(clearFieldAuth())
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);