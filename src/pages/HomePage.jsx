import React, { useState, useEffect } from 'react'
import NoteList from '../components/NoteList'
import { useSearchParams, Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { getActiveNotes } from '../utils/network-data'
import FloatingButton from '../components/FloatingButton'
import { LocaleConsumer } from '../contexts/LocaleContext'

function HomePage() {
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
      const { data } = await getActiveNotes()
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
        <>
          <main className='note'>
            <section className='note__container container'>
              <div className='note__navigation'>
                <h2>{locale === 'id' ? 'Catatan Aktif' : 'Active Notes'}</h2>
                <nav>
                  <ul>
                    <li>
                      <Link to='/' className='active'>
                        {locale === 'id' ? 'Sedang Aktif' : 'Currently Active'}
                      </Link>
                    </li>
                    <li>
                      <Link to='/archived'> {locale === 'id' ? 'Diarsipkan' : 'Archived'}</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <SearchBar searchHandler={onSearchHandler} searchKeyword={searchKeyword} />
              <NoteList notes={notes.filter((note) => note.title.toLowerCase().includes(searchKeyword.toLowerCase()))} initializing={initializing} />
            </section>
          </main>
          <FloatingButton isAddLink={true} />
        </>
      )}
    </LocaleConsumer>
  )
}

export default HomePage
