import React from 'react';
import LocaleContext from '../contexts/LocaleContext';

function Footer() {
    const { locale } = React.useContext(LocaleContext);

    return (
        <footer className='footer'>
            <div className='container'>
                {locale === 'id' ? (
                    <p>
                        Hak Cipta &copy; {new Date().getFullYear()} - Dikembangkan oleh <strong>Muhammad Ridwan</strong>
                    </p>
                ) : (
                    <p>
                        Copyright &copy; {new Date().getFullYear()} - Developed by <strong>Muhammad Ridwan</strong>
                    </p>
                )}
            </div>
        </footer>
    );
}

export default Footer;
