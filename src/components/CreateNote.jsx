import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import Icon from './Icon'
import Input from './Input'
import { MAX_TITLE } from '../constants'

function CreateNote({ onCreate }) {
  const emptyState = {
    title: '',
    note: '',
  }
  const [state, setState] = useState(emptyState)

  const handleFormSubmit = (event) => {
    onCreate({
      title: state.title,
      body: state.note,
    })
    setState(emptyState)
    event.preventDefault()
  }

  const handleChange = (event) => {
    setState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
    event.preventDefault()
  }

  return (
    <div className='container'>
      <div className='mx-auto max-w-2xl'>
        <div className='relative mt-5 flex flex-col items-center rounded-lg bg-white py-5 px-8 shadow-sm'>
          <div className='-mt-12 mb-4 rounded-md bg-white px-5 py-3 shadow-lg'>
            <h2 className='text-2xl font-semibold text-gray-700'>
              Create a Note
            </h2>
          </div>
          <form className='w-full space-y-6' onSubmit={handleFormSubmit}>
            <Input
              id='title'
              title='Title'
              type='text'
              name='title'
              placeholder='Write your title...'
              value={state.title}
              limit={MAX_TITLE}
              onChange={handleChange}
            />
            <Input
              id='note'
              as='textarea'
              title='Note'
              name='note'
              rows={5}
              placeholder='Write your note...'
              value={state.note}
              onChange={handleChange}
            />
            <div>
              <Button
                isSubmit
                isFluid
                rightIcon={<Icon name='add' className='ml-2 h-5 w-5' />}
              >
                Create
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

CreateNote.propTypes = {
  onCreate: PropTypes.func.isRequired,
}

export default CreateNote
