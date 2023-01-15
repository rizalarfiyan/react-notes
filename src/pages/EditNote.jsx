import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, CardInput, Icon, Input, MainContainer } from '../components'
import { MAX_TITLE } from '../constants'
import { editNote, getNote } from '../utils/local-data'
import NotFound from './NotFound'

function EditNote() {
  const [note, setNote] = useState(undefined)
  const { id } = useParams()
  const navigate = useNavigate()

  const [state, setState] = useState({
    title: '',
    note: '',
  })

  const handleFormSubmit = (event) => {
    editNote({
      id,
      title: state.title,
      body: state.note,
    })
    navigate(`/note/${note.id}`)
    event.preventDefault()
  }

  const handleChange = (event) => {
    setState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
    event.preventDefault()
  }

  useEffect(() => {
    const noteData = getNote(id)
    setNote(noteData)
    setState({
      title: noteData.title || '',
      note: noteData.body || '',
    })
  }, [])

  if (!note) {
    return <NotFound />
  }

  return (
    <MainContainer isCenter>
      <CardInput title='Edit a Note'>
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
              rightIcon={<Icon name='edit' className='ml-2 h-5 w-5' />}
            >
              Edit
            </Button>
          </div>
        </form>
      </CardInput>
    </MainContainer>
  )
}

export default EditNote
