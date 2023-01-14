import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navbar, Footer, Link, Icon } from './components'
import { ListNote, CreateNote, NotFound } from './pages'

function App() {
  return (
    <>
      <Navbar>
        <div className='flex items-center justify-center gap-2'>
          <Link
            to='/'
            rightIcon={<Icon name='note' className='ml-2 h-5 w-5' />}
          >
            Notes
          </Link>
          <Link
            to='/create'
            rightIcon={<Icon name='add' className='ml-2 h-5 w-5' />}
          >
            Create
          </Link>
        </div>
      </Navbar>
      <main className='flex min-h-[calc(100vh-60px)] min-w-full flex-col justify-center gap-16 pt-32 xs:pt-28'>
        <Routes>
          <Route path='/' element={<ListNote />} />
          <Route path='/create' element={<CreateNote />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
