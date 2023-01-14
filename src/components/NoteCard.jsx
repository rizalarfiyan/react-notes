import React from 'react'
import PropTypes from 'prop-types'
import { Link as LinkDom } from 'react-router-dom'
import { showFormattedDate } from '../utils'
import Button from './Button'
import Link from './Link'
import Icon from './Icon'

function NoteCard({ data, onDelete, onToggleArchive }) {
  const handleDelete = () => {
    onDelete(data.id)
  }

  const handleToggleArchive = () => {
    onToggleArchive(data.id)
  }

  return (
    <div className='relative mb-4 break-inside-avoid rounded-md bg-white p-6 shadow-sm'>
      <span className='text-sm text-gray-500'>
        {showFormattedDate(data.createdAt)}
      </span>
      <LinkDom to={`/note/${data.id}`}>
        <h2 className='my-2 text-xl font-semibold text-gray-900 underline decoration-slate-200 underline-offset-4'>
          {data.title}
        </h2>
      </LinkDom>
      <p className='text-gray-700'>{data.body}</p>
      <div className='mt-6 flex items-center justify-center gap-3'>
        <Link
          to={`/note/edit/${data.id}`}
          rightIcon={<Icon name='edit' className='ml-2 h-5 w-5' />}
        >
          Edit
        </Link>
        <Button
          type='button'
          rightIcon={
            <Icon
              name={data.archived ? 'note' : 'archive'}
              className='ml-2 h-5 w-5'
            />
          }
          onClick={handleToggleArchive}
        >
          {data.archived ? 'Active' : 'Archive'}
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

NoteCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleArchive: PropTypes.func.isRequired,
}

export default NoteCard
