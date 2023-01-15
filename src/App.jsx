import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navbar, Footer, Link, Icon, Button } from './components'
import { useGlobalData } from './hooks/useGlobal'
import {
  ListNote,
  CreateNote,
  NotFound,
  DetailNote,
  EditNote,
  Login,
} from './pages'
import Register from './pages/Register'

function App() {
  const { isDarkMode, toggleMode } = useGlobalData()

  return (
    <>
      <Navbar>
        <div className='flex items-center justify-center gap-2'>
          <Button
            className='rounded-full bg-transparent !px-2 text-blue-500 hover:bg-blue-50 focus:bg-blue-100 active:bg-blue-50'
            type='button'
            onClick={toggleMode}
          >
            <Icon name={isDarkMode ? 'dark' : 'light'} className='h-5 w-5' />
          </Button>
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
      <Routes>
        <Route path='/' element={<ListNote />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/create' element={<CreateNote />} />
        <Route path='/note/:id' element={<DetailNote />} />
        <Route path='/note/edit/:id' element={<EditNote />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
