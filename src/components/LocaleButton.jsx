import React from 'react';
import LocaleContext from '../contexts/LocaleContext';

function LocaleButton() {
    const { locale, toggleLocale } = React.useContext(LocaleContext);

    return (
        <button className='btn-language' onClick={toggleLocale}>
            {locale === 'id' ? <img src='/id.svg' /> : <img src='/en.svg' />}
        </button>
    );
}

export default LocaleButton;
