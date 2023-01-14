import React from 'react'
import PropTypes from 'prop-types'

function NoteCard({
  noteId,
  title,
  body,
  createdAt,
  onDelete,
  onToggleArchive,
}) {
  const handleDelete = () => {
    onDelete(noteId)
  }

  const handleToggleArchive = () => {
    onToggleArchive(noteId)
  }

  return (
    <div>
      <p>{noteId}</p>
      <h2>{title}</h2>
      <p>{createdAt}</p>
      <p>{body}</p>
      <div>
        <button
          type='button'
          className='rounded border border-red-500 p-4'
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          type='button'
          className='rounded border border-red-500 p-4'
          onClick={handleToggleArchive}
        >
          Toggle
        </button>
      </div>
    </div>
  )
}

NoteCard.propTypes = {
  noteId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleArchive: PropTypes.func.isRequired,
}

export default NoteCard
