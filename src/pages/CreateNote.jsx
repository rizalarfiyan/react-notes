import React, { useState } from 'react'
import { Button, CardInput, Icon, Input, MainContainer } from '../components'
import { MAX_TITLE } from '../constants'
import { addNote } from '../utils/local-data'

function CreateNote() {
  const emptyState = {
    title: '',
    note: '',
  }
  const [state, setState] = useState(emptyState)

  const handleFormSubmit = (event) => {
    addNote({
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
    <MainContainer isCenter>
      <CardInput title='Create a Note'>
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
      </CardInput>
    </MainContainer>
  )
}

export default CreateNote
