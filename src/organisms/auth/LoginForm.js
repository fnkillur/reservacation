import React from 'react';
import {connect} from 'react-redux';
import Input from '../../components/Input';
import {updateFieldAuth, clearFieldAuth} from "../../actions";
import {login, setLogin} from "../../_common/services/user.service";

const LoginForm = ({location, user, updateField, clear}) => {

  const handleSubmit = e => {
    e.preventDefault();
    onLogin();
  };

  const onLogin = async () => {
    try {
      const res = await login(user);
      setLogin(res.data);
      clear();
      window.location.href = location.search.replace(new RegExp('\\?.+url=', 'g'), '') || '/stores';
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
      <button type='submit' className='form-inner btn-submit'>로그인</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);