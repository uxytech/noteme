import React, { useState, useEffect } from 'react'
import NoteList from '../components/NoteList'
import { useSearchParams, Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { getArchivedNotes } from '../utils/network-data'
import { LocaleConsumer } from '../contexts/LocaleContext'

function ArchivedPage() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [notes, setNotes] = useState([])
  const [initializing, setInitializing] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const keyword = searchParams.get('keyword')
    setSearchKeyword(keyword || '')
  }, [searchParams])

  useEffect(() => {
    fetchNotes()
  }, [searchParams])

  const fetchNotes = async () => {
    try {
      const { data } = await getArchivedNotes()
      setNotes(data)
      setInitializing(false)
    } catch (error) {
      console.error('Gagal mengambil data catatan:', error)
    }
  }

  const onSearchHandler = (keyword) => {
    setSearchKeyword(keyword)
    setSearchParams({ keyword })
  }

  return (
    <LocaleConsumer>
      {({ locale }) => (
        <main className='note'>
          <section className='note__container container'>
            <div className='note__navigation'>
              <h2>{locale === 'id' ? 'Arsip Catatan' : 'Notes Archived'}</h2>
              <nav>
                <ul>
                  <li>
                    <Link to='/'>{locale === 'id' ? 'Sedang Aktif' : 'Currently Active'}</Link>
                  </li>
                  <li>
                    <Link to='/archived' className='active'>
                      {locale === 'id' ? 'Diarsipkan' : 'Archived'}
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <SearchBar searchHandler={onSearchHandler} searchKeyword={searchKeyword} />
            <NoteList notes={notes.filter((note) => note.title.toLowerCase().includes(searchKeyword.toLowerCase()))} initializing={initializing} />
          </section>
        </main>
      )}
    </LocaleConsumer>
  )
}

export default ArchivedPage
