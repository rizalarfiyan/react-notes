import React, { useState } from 'react'
import PropTypes from 'prop-types'

function CreateNote({ onCreate }) {
  const [state, setState] = useState({
    title: '',
    note: '',
  })

  const handleFormSubmit = (event) => {
    onCreate(state)
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
            <div>
              <label
                htmlFor='title'
                className='mb-2 block text-sm font-medium text-gray-900'
              >
                Title
              </label>
              <input
                type='text'
                id='title'
                name='title'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-blue-500 focus:ring-blue-500'
                placeholder='Write your title...'
                value={state.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor='note'
                className='mb-2 block text-sm font-medium text-gray-900'
              >
                Note
              </label>
              <textarea
                type='text'
                id='note'
                name='note'
                className='block max-h-[220px] min-h-[44px] w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-blue-500 focus:ring-blue-500'
                rows={5}
                placeholder='Write your note...'
                value={state.note}
                onChange={handleChange}
              />
            </div>
            <div>
              <button
                type='submit'
                className='mr-2 mb-2 w-full rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700'
              >
                Create
              </button>
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
