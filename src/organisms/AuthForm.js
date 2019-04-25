import React from 'react';
import './AuthForm.scss';
import Input from "../components/Input";

const AuthForm = ({form, user, onCreate, onChange}) => {

  const renderFields = () => {
    return form.inputList.map((input, index) => (
      <div key={index} className='form-inner'>
        <Input
          name={input.name}
          type={input.type}
          value={input.value}
          onChange={handleChange}
          placeholder={input.placeholder}
          required={true}
        />
      </div>
    ));
  };

  const handleChange = e => {
    onChange({name: e.target.name, value: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.title === '회원가입' && user.password !== user.rePassword) {
      alert('패스워드를 확인해주세요.');
      return;
    }

    onCreate(user);
  };

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      {renderFields()}
      <button type='submit' className='form-inner btn-submit'>{form.title}</button>
    </form>
  );
}

export default AuthForm;
