import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LocaleContext from '../contexts/LocaleContext';

function FloatingButton({ onCancel, id, title, onAdd, isAddLink, onDelete, onArchive, onUnarchive, archived }) {
    const { locale } = React.useContext(LocaleContext);

    return (
        <>
            <div className='floating-button'>
                {onCancel && (
                    <button onClick={() => onCancel(id)} title={locale === 'id' ? 'Batalkan' : 'Cancel'} className='btn-delete'>
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'>
                            <path d='M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z'></path>
                        </svg>
                    </button>
                )}

                {onAdd && (
                    <button onClick={() => onAdd()} title={locale === 'id' ? 'Tambahkan' : 'Add'} className='btn-add'>
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'>
                            <path d='M18 19H19V6.82843L17.1716 5H16V9H7V5H5V19H6V12H18V19ZM4 3H18L20.7071 5.70711C20.8946 5.89464 21 6.149 21 6.41421V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM8 14V19H16V14H8Z'></path>
                        </svg>
                    </button>
                )}

                {onArchive &&
                    (!archived ? (
                        <button onClick={() => onArchive(id, title)} title={locale === 'id' ? 'Arsipkan' : 'Archive'} className='btn-archive'>
                            <svg stroke='currentColor' fill='currentColor' strokeWidth='0' viewBox='0 0 24 24' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'>
                                <path fill='none' d='M0 0h24v24H0V0z'></path>
                                <path d='M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.81.97H5.44l.8-.97zM5 19V8h14v11H5zm8.45-9h-2.9v3H8l4 4 4-4h-2.55z'></path>
                            </svg>
                        </button>
                    ) : (
                        <button onClick={() => onUnarchive(id, title)} title={locale === 'id' ? 'Aktifkan' : 'Active'} className='btn-unarchive'>
                            <svg stroke='currentColor' fill='currentColor' strokeWidth='0' viewBox='0 0 24 24' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'>
                                <path fill='none' d='M0 0h24v24H0V0z'></path>
                                <path d='M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm3-5h2.55v3h2.9v-3H16l-4-4z'></path>
                            </svg>
                        </button>
                    ))}

                {onDelete && (
                    <button onClick={() => onDelete(id, title)} title={locale === 'id' ? 'Hapus' : 'Delete'} className='btn-delete'>
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'>
                            <path d='M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z'></path>
                        </svg>
                    </button>
                )}

                {isAddLink && (
                    <Link to='/add' title={locale === 'id' ? 'Tambahkan' : 'Add'} className='btn-add'>
                        <button>
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'>
                                <path d='M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z'></path>
                            </svg>
                        </button>
                    </Link>
                )}
            </div>
        </>
    );
}

FloatingButton.propTypes = {
    onCancel: PropTypes.func,
    id: PropTypes.string,
    title: PropTypes.string,
    onAdd: PropTypes.func,
    isAddLink: PropTypes.bool,
    onDelete: PropTypes.func,
    onArchive: PropTypes.func,
    onUnarchive: PropTypes.func,
    archived: PropTypes.bool
};

export default FloatingButton;
