import React from 'react'
import { showFormattedDate } from '../utils/format'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import LocaleContext from '../contexts/LocaleContext'
import parser from 'html-react-parser'

function NoteItem({ id, title, body, createdAt }) {
  const { locale } = React.useContext(LocaleContext)

  return (
    <Link className='note-item' id={id} to={`/note/${id}`}>
      <div className='note-item__body'>
        <h3 className='note-item__title'>{title}</h3>
        <p className='note-item__date'>{locale === 'id' ? showFormattedDate(createdAt, 'id') : showFormattedDate(createdAt, 'en')}</p>
        <div className='note-item__content'>{parser(body)}</div>
      </div>
    </Link>
  )
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
}

export default NoteItem
