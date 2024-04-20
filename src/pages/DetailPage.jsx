import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote } from '../utils/network-data';
import { showFormattedDate } from '../utils/format';
import FloatingButton from '../components/FloatingButton';
import Swal from 'sweetalert2';
import { archiveNote, unarchiveNote, deleteNote } from '../utils/network-data';
import parser from 'html-react-parser';
import LocaleContext from '../contexts/LocaleContext';

function DetailPage() {
    const [note, setNote] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const { locale } = React.useContext(LocaleContext);

    useEffect(() => {
        getNote(id)
            .then(({ data }) => {
                setNote(data);
                setLoading(false);
            })
            .catch((error) => {
                if (locale === 'id') {
                    console.error('Gagal mendapatkan rincian catatan', error);
                } else {
                    console.error('Failed to get notes detail', error);
                }
                setLoading(false);
            });
    }, []);

    const { title, body, createdAt, archived } = note;
    const backToHomePage = () => {
        navigate('/');
    };

    const onArchiveHandler = (id, title) => {
        archiveNote(id);
        navigate('/archived');
        Swal.fire({
            title: locale === 'id' ? 'Berhasil Arsipkan Catatan!' : 'Note Archived Successfully!',
            text: locale === 'id' ? `Catatan dengan judul ${title} telah diarsipkan` : `The note with the title ${title} has been archived`,
            icon: 'success',
            timer: 1000
        });
    };

    const onUnarchiveHandler = (id, title) => {
        unarchiveNote(id);
        navigate('/');
        Swal.fire({
            title: locale === 'id' ? 'Berhasil Aktifkan Catatan!' : 'Note Activated Successfully!',
            text: locale === 'id' ? `Catatan dengan judul ${title} telah diaktifkan kembali` : `The note with the title ${title} has been activated`,
            icon: 'success',
            timer: 1000
        });
    };

    const onDeleteHandler = (id, title) => {
        Swal.fire({
            title: locale === 'id' ? 'Yakin hapus data catatan?' : 'Are you sure to delete this note?',
            text: locale === 'id' ? 'Kamu tidak akan bisa mengembalikan catatan yang sudah dihapus!' : 'You cannot recover a deleted note!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: locale === 'id' ? 'Ya, hapus!' : 'Yes, delete it!',
            cancelButtonText: locale === 'id' ? 'Batal' : 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: locale === 'id' ? 'Berhasil Hapus Catatan!' : 'Note Deleted Successfully!',
                    text: locale === 'id' ? `Catatan dengan judul ${title} berhasil dihapus` : `The note with the title ${title} has been deleted`,
                    icon: 'success',
                    timer: 1000
                });
                deleteNote(id);
                navigate('/');
            }
        });
    };

    return (
        <>
            <main className='note-detail'>
                <div className='note-detail__container container'>
                    <button className='btn-link' onClick={() => backToHomePage()}>
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'>
                            <path d='M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z'></path>
                        </svg>{' '}
                        {locale === 'id' ? 'Kembali ke Halaman Utama' : 'Back to Home Page'}
                    </button>
                    {!loading ? (
                        <>
                            <h1>{title}</h1>
                            {locale === 'id' ? <span>Dibuat pada {showFormattedDate(createdAt, 'id')}</span> : <span>Created at {showFormattedDate(createdAt, 'en')}</span>}
                            {archived && <span className='note__status'>{locale === 'id' ? 'Diarsipkan' : 'Archived'}</span>}
                            {body && <div className='note-detail__body'>{parser(body)}</div>}
                        </>
                    ) : (
                        <div className='loader__container'>
                            <div className='loader'></div>
                        </div>
                    )}
                </div>
                <FloatingButton archived={archived} onArchive={onArchiveHandler} onUnarchive={onUnarchiveHandler} onDelete={onDeleteHandler} id={id} title={title} />
            </main>
        </>
    );
}

export default DetailPage;
