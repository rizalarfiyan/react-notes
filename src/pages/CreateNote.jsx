import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, CardInput, Icon, Input, MainContainer } from '../components'
import { MAX_TITLE } from '../constants'
import { useForm, useNotification } from '../hooks'
import { addNote } from '../utils'

function CreateNote() {
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
          setError('title', 'Title is required')
          break
        }
        clearError('title')
        break
      case 'note':
        if (value === '') {
          setError('note', 'Note is required')
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
      notification.error(data.message)
      return
    }
    notification.success(data.message)
    navigate('/')
  }

  return (
    <MainContainer isCenter>
      <CardInput title='Create a Note'>
        <form className='w-full space-y-6' onSubmit={handleFormSubmit}>
          <Input
            id='title'
            title='Title'
            type='text'
            name='title'
            placeholder='Write your title...'
            value={form.title}
            error={error.title}
            limit={MAX_TITLE}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            id='note'
            as='textarea'
            title='Note'
            name='note'
            rows={5}
            placeholder='Write your note...'
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
              Create
            </Button>
          </div>
        </form>
      </CardInput>
    </MainContainer>
  )
}

export default CreateNote
