import React from 'react';
import { Link } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';

function NotFound() {
    const { locale } = React.useContext(LocaleContext);

    return (
        <>
            <main className='note'>
                <div className='notfound__container container'>
                    <h1>{locale === 'id' ? '404 Tidak Ditemukan' : '404 Not Found'}</h1>
                    <p>{locale === 'id' ? 'Tidak ada halaman yang ditemukan' : 'No pages found'}</p>
                    <Link to='/' className='btn-primary'>
                        {locale === 'id' ? 'Kembali ke Halaman Utama' : 'Back to Home Page'}
                    </Link>
                </div>
            </main>
        </>
    );
}

export default NotFound;
