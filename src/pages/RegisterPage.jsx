import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { register } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';
import LocaleButton from '../components/LocaleButton';

function RegisterPage() {
    const navigate = useNavigate();
    const { locale } = React.useContext(LocaleContext);

    async function onRegisterHandler(user) {
        const { error } = await register(user);
        if (!error) {
            navigate('/');
        }
    }

    return (
        <main>
            <section className='register'>
                <div className='register__container'>
                    <h1 className='header__brand'>
                        <Link to='/'>
                            Note<span>Me</span>
                        </Link>
                    </h1>
                    <RegisterInput register={onRegisterHandler} />
                    {locale === 'id' ? (
                        <p>
                            Kembali ke <Link to='/'>Masuk</Link>
                        </p>
                    ) : (
                        <p>
                            Back to <Link to='/'>Login</Link>
                        </p>
                    )}
                    <LocaleButton />
                </div>
            </section>
        </main>
    );
}

export default RegisterPage;
