import React, { useState } from 'react'
import { Navbar, Footer, CreateNote, Notes } from './components'
import { getInitialData } from './utils'

function App() {
  const [notes, setNotes] = useState(getInitialData())
  const [search, setSearch] = useState('')

  const handleDelete = (id) => {
    setNotes(notes.filter((val) => val.id !== id))
  }

  const handleToggleArchive = (id) => {
    setNotes(
      notes.map((val) => {
        const data = val
        if (val.id === id) {
          data.archived = !val.archived
        }
        return data
      })
    )
  }

  const handleCreate = ({ title, body }) => {
    setNotes((prev) => {
      return [
        ...prev,
        {
          id: +new Date(),
          title,
          body,
          createdAt: new Date().toDateString(),
          archived: false,
        },
      ]
    })
  }

  return (
    <>
      <Navbar onSearch={setSearch} />
      <main className='flex min-h-[calc(100vh-60px)] min-w-full flex-col gap-16 pt-32 xs:pt-28'>
        <CreateNote onCreate={handleCreate} />
        <Notes
          data={notes}
          search={search}
          onDelete={handleDelete}
          onToggleArchive={handleToggleArchive}
        />
      </main>
      <Footer />
    </>
  )
}

export default App
