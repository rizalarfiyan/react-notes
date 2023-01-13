import React from 'react'
import Title from './Title'
import Search from './Search'

function Navbar() {
  return (
    <header className='fixed top-0 z-50 w-full bg-white shadow-[0_10px_40px_rgba(0,0,0,.05)]'>
      <div className='container'>
        <div className='flex flex-col items-center justify-center gap-2 py-3.5 xs:flex-row xs:justify-between'>
          <Title />
          <Search />
        </div>
      </div>
    </header>
  )
}

export default Navbar
