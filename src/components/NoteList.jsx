import React from 'react';
import NoteItem from './NoteItem';
import PropTypes from 'prop-types';
import LocaleContext from '../contexts/LocaleContext';

function NoteList({ notes, initializing }) {
    const { locale } = React.useContext(LocaleContext);

    if (initializing) {
        return (
            <div className='loader__container'>
                <div className='loader'></div>
            </div>
        );
    }

    return <div className='note-list'>{notes.length > 0 ? notes.map((note) => <NoteItem {...note} key={note.id} id={note.id} />) : <p className='message-empty'>{locale === 'id' ? 'Tidak ada catatan' : 'There are no notes here'}</p>}</div>;
}

NoteList.propTypes = {
    notes: PropTypes.array.isRequired,
    initializing: PropTypes.bool.isRequired
};

export default NoteList;
