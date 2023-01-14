import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { deleteNote, getNote, toggleArchiveNote } from '../utils/local-data'
import NotFound from './NotFound'
import { Button, Icon, Link } from '../components'
import { showFormattedDate } from '../utils'

function DetailNote({ parentRef }) {
  const [note, setNote] = useState(undefined)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const noteData = getNote(id)
    setNote(noteData)
    if (!noteData) return () => {}
    if (parentRef?.current?.classList) {
      parentRef.current.classList.remove('justify-center')
    }
    return () => {
      if (parentRef?.current?.classList) {
        parentRef.current.classList.add('justify-center')
      }
    }
  }, [])

  if (!note) {
    return <NotFound />
  }

  const handleDelete = () => {
    deleteNote(note.id)
    navigate('/')
  }

  const handleToggleArchive = () => {
    toggleArchiveNote(note.id)
    setNote(getNote(note.id))
  }

  return (
    <div className='container'>
      <div className='relative h-full w-full rounded-md bg-white p-8 shadow-sm'>
        <div className='text-center'>
          <h1 className='mb-2 text-4xl font-semibold text-gray-700'>
            {note.title}
          </h1>
          <div className='mb-6 flex items-center justify-center gap-6'>
            <div className='flex items-center gap-2 text-gray-600'>
              <Icon className='h-5 w-5' name='calendar' />
              <span>{showFormattedDate(note.createdAt)}</span>
            </div>
            <div className='flex items-center gap-2 text-gray-600'>
              <Icon className='h-6 w-6' name='label' />
              <span>{note.archived ? 'Archive' : 'Active'}</span>
            </div>
          </div>
        </div>
        <p className='text-gray-700'>{note.body}</p>
        <div className='absolute top-4 left-4'>
          <Link
            to='/'
            size='sm'
            leftIcon={<Icon className='mr-1 h-6 w-6' name='right' />}
            className='pl-1.5 pr-2.5'
          >
            Back
          </Link>
        </div>
      </div>
      <div className='mt-4 flex items-center justify-end gap-2'>
        <Link
          to={`/note/edit/${note.id}`}
          rightIcon={<Icon name='edit' className='ml-2 h-5 w-5' />}
        >
          Edit
        </Link>
        <Button
          type='button'
          rightIcon={
            <Icon
              name={note.archived ? 'note' : 'archive'}
              className='ml-2 h-5 w-5'
            />
          }
          onClick={handleToggleArchive}
        >
          {note.archived ? 'Active' : 'Archive'}
        </Button>
        <Button
          rightIcon={<Icon name='trash' className='ml-2 h-5 w-5' />}
          variant='danger'
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

DetailNote.propTypes = {
  parentRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) }),
  ]).isRequired,
}

export default DetailNote
