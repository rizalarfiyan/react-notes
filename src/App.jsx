import React, { useRef } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navbar, Footer, Link, Icon } from './components'
import {
  ListNote,
  CreateNote,
  NotFound,
  DetailNote,
  EditNote,
  Login,
} from './pages'

function App() {
  const ref = useRef(null)
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
      <main
        ref={ref}
        className='flex min-h-[calc(100vh-60px)] min-w-full flex-col justify-center gap-16 pt-32 xs:pt-28'
      >
        <Routes>
          <Route path='/' element={<ListNote parentRef={ref} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<CreateNote />} />
          <Route path='/note/:id' element={<DetailNote parentRef={ref} />} />
          <Route path='/note/edit/:id' element={<EditNote />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
