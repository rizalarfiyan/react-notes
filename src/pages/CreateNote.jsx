import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, CardInput, Icon, Input, MainContainer } from '../components'
import { MAX_TITLE } from '../constants'
import { useForm, useGlobalData, useNotification } from '../hooks'
import { addNote } from '../utils'

function CreateNote() {
  const { getLang, logout } = useGlobalData()
  const notification = useNotification()
  const navigate = useNavigate()
  const intialData = {
    title: '',
    note: '',
  }

  const validation = (key, value, setError, clearError) => {
    switch (key) {
      case 'title':
        if (value === '') {
          setError('title', getLang('input.validation.title.required'))
          break
        }
        clearError('title')
        break
      case 'note':
        if (value === '') {
          setError('note', getLang('input.validation.note.required'))
          break
        }
        clearError('note')
        break
      default:
        break
    }
  }

  const {
    handleChange,
    handleBlur,
    setLoading,
    form,
    error,
    isDisabled,
    isLoading,
  } = useForm(intialData, validation)

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const data = await addNote({
      title: form.title,
      body: form.note,
    })
    setLoading(false)
    if (data.error) {
      if (data.code === 401) {
        logout()
        notification.error(getLang('title.expired'))
        return
      }
      notification.error(data.message)
      return
    }
    notification.success(data.message)
    navigate('/')
  }

  return (
    <MainContainer isCenter>
      <CardInput title={getLang('title.create')}>
        <form className='w-full space-y-6' onSubmit={handleFormSubmit}>
          <Input
            id='title'
            title={getLang('input.label.title')}
            type='text'
            name='title'
            placeholder={getLang('input.placeholder.title')}
            value={form.title}
            error={error.title}
            limit={MAX_TITLE}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            id='note'
            as='textarea'
            title={getLang('input.label.note')}
            name='note'
            rows={5}
            placeholder={getLang('input.placeholder.note')}
            value={form.note}
            error={error.note}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div>
            <Button
              isSubmit
              isFluid
              isLoading={isLoading}
              disabled={isDisabled}
              rightIcon={<Icon name='add' className='ml-2 h-5 w-5' />}
            >
              {getLang('action.create')}
            </Button>
          </div>
        </form>
      </CardInput>
    </MainContainer>
  )
}

export default CreateNote
