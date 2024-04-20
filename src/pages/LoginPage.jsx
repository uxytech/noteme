import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { login } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';
import LocaleButton from '../components/LocaleButton';

function LoginPage({ loginSuccess }) {
    const { locale } = React.useContext(LocaleContext);

    async function onLogin({ email, password }) {
        const { error, data } = await login({ email, password });

        if (!error) {
            loginSuccess(data);
        }
    }

    return (
        <main>
            <section className='login'>
                <div className='login__container'>
                    <h1 className='header__brand'>
                        <Link to='/'>
                            Note<span>Me</span>
                        </Link>
                    </h1>
                    <LoginInput login={onLogin} />
                    {locale === 'id' ? (
                        <p>
                            Belum punya akun? <Link to='/register'>Daftar di sini.</Link>
                        </p>
                    ) : (
                        <p>
                            Don't have an account? <Link to='/register'>Register here.</Link>
                        </p>
                    )}
                    <LocaleButton />
                </div>
            </section>
        </main>
    );
}

LoginPage.propTypes = {
    loginSuccess: PropTypes.func.isRequired
};

export default LoginPage;
