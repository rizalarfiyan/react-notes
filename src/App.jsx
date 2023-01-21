import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  Navbar,
  Footer,
  Link,
  Icon,
  Button,
  GuardedRoute,
  UserDropdown,
  Dropdown,
} from './components'
import { LANGUAGE } from './constants'
import { useGlobalData } from './hooks'
import { ListNote, CreateNote, NotFound, DetailNote, Login } from './pages'
import Register from './pages/Register'

function App() {
  const { isDarkMode, toggleMode, auth, lang, getLang, changeLang } =
    useGlobalData()

  const handleLanguage = (event) => {
    changeLang(event.target.value)
    event.preventDefault()
  }

  const handleToggleMode = (event) => {
    toggleMode(isDarkMode)
    event.preventDefault()
  }

  return (
    <>
      <Navbar>
        <div className='flex items-center justify-center gap-2'>
          <Dropdown
            value={lang.slug}
            data={LANGUAGE}
            onChange={handleLanguage}
            className='w-[74px]'
          />
          <Button
            className='rounded-full bg-transparent !px-2 text-blue-500 hover:bg-blue-50 focus:bg-blue-100 active:bg-blue-50'
            type='button'
            onClick={handleToggleMode}
          >
            <Icon name={isDarkMode ? 'light' : 'dark'} className='h-5 w-5' />
          </Button>
          {auth && (
            <>
              <Link
                to='/'
                rightIcon={<Icon name='note' className='ml-2 h-5 w-5' />}
              >
                {getLang('title.note')}
              </Link>
              <Link
                to='/create'
                rightIcon={<Icon name='add' className='ml-2 h-5 w-5' />}
              >
                {getLang('action.create')}
              </Link>
              <UserDropdown />
            </>
          )}
        </div>
      </Navbar>
      <Routes>
        <Route element={<GuardedRoute requireAuth />}>
          <Route path='/' element={<ListNote />} />
          <Route path='/create' element={<CreateNote />} />
          <Route path='/note/:id' element={<DetailNote />} />
        </Route>
        <Route element={<GuardedRoute redirectAuth />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
