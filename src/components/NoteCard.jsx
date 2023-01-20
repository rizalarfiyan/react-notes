import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Link as LinkDom } from 'react-router-dom'
import { showFormattedDate } from '../utils'
import Button from './Button'
import Link from './Link'
import Icon from './Icon'
import { useGlobalData, useNotification } from '../hooks'

function NoteCard({ data, onDelete, onToggleArchive, triggerFetchData }) {
  const { lang, getLang } = useGlobalData()
  const [isLoading, setIsLoading] = useState({
    delete: false,
    toggle: false,
  })
  const notification = useNotification()

  const handleDelete = async () => {
    setIsLoading((prev) => ({ ...prev, delete: true }))
    const res = await onDelete(data.id)
    setIsLoading((prev) => ({ ...prev, delete: false }))
    if (res.error) {
      notification.error(res.message)
      return
    }
    notification.success(res.message)
    await triggerFetchData()
  }

  const handleToggleArchive = async () => {
    setIsLoading((prev) => ({ ...prev, toggle: true }))
    const res = await onToggleArchive(data.id, data.archived)
    setIsLoading((prev) => ({ ...prev, toggle: false }))
    if (res.error) {
      notification.error(res.message)
      return
    }
    notification.success(res.message)
    await triggerFetchData()
  }

  const formatDate = useMemo(() => {
    return showFormattedDate(data.createdAt, lang.dateLocale)
  }, [lang])

  return (
    <div className='relative mb-4 break-inside-avoid rounded-md bg-white p-6 shadow-sm'>
      <span className='text-sm text-gray-500'>{formatDate}</span>
      <LinkDom to={`/note/${data.id}`}>
        <h2 className='my-2 text-xl font-semibold text-gray-900 underline decoration-slate-200 underline-offset-4'>
          {data.title}
        </h2>
      </LinkDom>
      <p className='text-gray-700'>{data.body}</p>
      <div className='mt-6 flex items-center justify-center gap-3'>
        <Link
          to={`/note/${data.id}`}
          rightIcon={<Icon name='view' className='ml-2 h-5 w-5' />}
        >
          {getLang('action.view')}
        </Link>
        <Button
          type='button'
          rightIcon={
            <Icon
              name={data.archived ? 'note' : 'archive'}
              className='ml-2 h-5 w-5'
            />
          }
          isLoading={isLoading.toggle}
          onClick={handleToggleArchive}
        >
          {data.archived
            ? getLang('note.type.active')
            : getLang('note.type.archived')}
        </Button>
        <Button
          rightIcon={<Icon name='trash' className='ml-2 h-5 w-5' />}
          variant='danger'
          isLoading={isLoading.delete}
          onClick={handleDelete}
        >
          {getLang('action.delete')}
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
  triggerFetchData: PropTypes.func.isRequired,
}

export default NoteCard
