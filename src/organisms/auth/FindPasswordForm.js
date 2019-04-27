import React from 'react';
import {connect} from 'react-redux';
import Input from '../../components/Input';
import {clearFieldAuth, updateFieldAuth} from "../../actions";

const FindPasswordForm = ({user, updateField, clear}) => {
  const handleSubmit = e => {
    e.preventDefault();

    clear();
    alert('기능 구현 중입니다... ㅜ.ㅜ');
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
      <button type='submit' className='form-inner btn-submit'>비밀번호 찾기</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(FindPasswordForm);