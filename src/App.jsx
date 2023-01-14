import React, { useState } from 'react'
import { Navbar, Footer, CreateNote, Notes } from './components'

function App() {
  const [search, setSearch] = useState('')

  return (
    <>
      <Navbar onSearch={setSearch} />
      <main className='flex min-h-[calc(100vh-60px)] min-w-full flex-col gap-16 pt-32 xs:pt-28'>
        <CreateNote />
        <Notes search={search} />
      </main>
      <Footer />
    </>
  )
}

export default App
