import React from 'react';
import PropTypes from 'prop-types';
import { LocaleConsumer } from '../contexts/LocaleContext';

class RegisterInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: ''
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onNameChange(event) {
        this.setState(() => {
            return {
                name: event.target.value
            };
        });
    }

    onEmailChange(event) {
        this.setState(() => {
            return {
                email: event.target.value
            };
        });
    }

    onPasswordChange(event) {
        this.setState(() => {
            return {
                password: event.target.value
            };
        });
    }

    onSubmitHandler(event) {
        event.preventDefault();

        this.props.register({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        });
    }

    render() {
        return (
            <LocaleConsumer>
                {({ locale }) => {
                    return (
                        <form onSubmit={this.onSubmitHandler} className='register-form'>
                            <input type='text' placeholder={locale === 'id' ? 'Nama Panggilan' : 'Nickname'} value={this.state.name} onChange={this.onNameChange} required />
                            <input type='email' placeholder={locale === 'id' ? 'Alamat Email' : 'Email Address'} value={this.state.email} onChange={this.onEmailChange} required />
                            <input type='password' placeholder={locale === 'id' ? 'Kata Sandi' : 'Password'} autoComplete='current-password' value={this.state.password} onChange={this.onPasswordChange} required />
                            <button className='btn-primary'>{locale === 'id' ? 'Daftar' : 'Register'}</button>
                        </form>
                    );
                }}
            </LocaleConsumer>
        );
    }
}

RegisterInput.propTypes = {
    register: PropTypes.func.isRequired
};

export default RegisterInput;
