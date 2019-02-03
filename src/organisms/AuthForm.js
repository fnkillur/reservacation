import React, { Component } from 'react';
import './AuthForm.scss';
import Input from '../components/Input';

class AuthForm extends Component {

    state = {
        email: '',
        password: '',
        rePassword: '',
        phone: '',
        name: '',
        role: 'user'
    }

    getFormData = (formIndex) => {
        let formData = [{
            name: 'email',
            value: this.state.email,
            placeholder: 'email@example.com',
            onChange: this.handleChange,
        }, {
            name: 'password',
            value: this.state.password,
            placeholder: '비밀번호',
            onChange: this.handleChange,
            type: 'password'
        }, {
            name: 'rePassword',
            value: this.state.rePassword,
            placeholder: '비밀번호 확인',
            onChange: this.handleChange,
            type: 'password'
        }, {
            name: 'phone',
            value: this.state.phone,
            placeholder: '연락처',
            onChange: this.handleChange
        }, {
            name: 'name',
            value: this.state.name,
            placeholder: '이름',
            onChange: this.handleChange
        }];

        return formData.slice(0, formIndex);
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.rePassword && (this.state.password !== this.state.rePassword)) {
            alert('패스워드를 확인해주세요.');
            return;
        }
        this.props.onCreate(this.state);
        this.setState({
            email: '',
            password: '',
            rePassword: '',
            phone: '',
            name: ''
        })
    };

    render() {
        let formData = this.getFormData(this.props.formEndIndex);

        return (
            <form className='auth-form' onSubmit={this.handleSubmit}>
                {formData.map((input, index) => {
                    return <section className='form-inner' key={index}>
                        <Input
                            name={input.name}
                            value={input.value}
                            placeholder={input.placeholder}
                            onChange={input.onChange}
                            type={input.type}
                            required={true}
                        />
                    </section>
                })}
                <section className='form-inner'>
                    <button type='submit' className='btn-submit'>{this.props.formTitle}</button>
                </section>
            </form>
        );
    }
}

export default AuthForm;
