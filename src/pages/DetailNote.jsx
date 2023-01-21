import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Icon, Link, MainContainer, Skeleton } from '../components'
import {
  deleteNote,
  getNote,
  showFormattedDate,
  toggleArchiveNote,
} from '../utils'
import { useGlobalData, useNotification } from '../hooks'

function DetailNote() {
  const { getLang, lang, logout } = useGlobalData()
  const [note, setNote] = useState({
    id: '',
    title: '',
    body: '',
    createdAt: '',
    archived: false,
    owner: '',
  })
  const { id } = useParams()
  const navigate = useNavigate()
  const notification = useNotification()
  const [isLoading, setIsLoading] = useState({
    global: false,
    delete: false,
    toggle: false,
  })

  const fetchData = async () => {
    if (!id) return
    setIsLoading((prev) => ({ ...prev, global: true }))
    const data = await getNote(id)
    setIsLoading((prev) => ({ ...prev, global: false }))
    if (data.error) {
      if (data.code === 401) {
        logout()
        notification.error(getLang('title.expired'))
        return
      }
      notification.error(data.message)
      navigate('/')
      return
    }
    setNote(data.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async () => {
    setIsLoading((prev) => ({ ...prev, delete: true }))
    const res = await deleteNote(id)
    setIsLoading((prev) => ({ ...prev, delete: false }))
    if (res.error) {
      if (res.code === 401) {
        logout()
        notification.error(getLang('title.expired'))
        return
      }
      notification.error(res.message)
      return
    }
    notification.success(res.message)
    navigate('/')
  }

  const handleToggleArchive = async () => {
    setIsLoading((prev) => ({ ...prev, toggle: true }))
    const res = await toggleArchiveNote(id, note.archived)
    setIsLoading((prev) => ({ ...prev, toggle: false }))
    if (res.error) {
      if (res.code === 401) {
        logout()
        notification.error(getLang('title.expired'))
        return
      }
      notification.error(res.message)
      return
    }
    notification.success(res.message)
    await fetchData()
  }

  const formatDate = useMemo(() => {
    return showFormattedDate(note.createdAt, lang.dateLocale)
  }, [lang])

  if (isLoading.global) {
    return (
      <MainContainer>
        <Skeleton.SkeletonDetailNote />
      </MainContainer>
    )
  }

  return (
    <MainContainer>
      <div className='container'>
        <div className='relative h-full w-full rounded-md bg-white p-8 shadow-sm'>
          <div className='text-center'>
            <h1 className='mb-2 text-4xl font-semibold text-gray-700'>
              {note.title}
            </h1>
            <div className='mb-6 flex items-center justify-center gap-6'>
              <div className='flex items-center gap-2 text-gray-600'>
                <Icon className='h-5 w-5' name='calendar' />
                <span>{formatDate}</span>
              </div>
              <div className='flex items-center gap-2 text-gray-600'>
                <Icon className='h-6 w-6' name='label' />
                <span>
                  {note.archived
                    ? getLang('note.type.archived')
                    : getLang('note.type.active')}
                </span>
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
              {getLang('action.back')}
            </Link>
          </div>
        </div>
        <div className='mt-4 flex items-center justify-end gap-2'>
          <Button
            type='button'
            rightIcon={
              <Icon
                name={note.archived ? 'note' : 'archive'}
                className='ml-2 h-5 w-5'
              />
            }
            isLoading={isLoading.toggle}
            onClick={handleToggleArchive}
          >
            {note.archived
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
    </MainContainer>
  )
}

export default DetailNote
