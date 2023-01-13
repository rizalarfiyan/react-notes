import React from 'react'

function Navbar() {
  return (
    <header className='fixed top-0 w-full shadow-[0_10px_40px_rgba(0,0,0,.05)]'>
      <div className='container'>
        <div className='flex flex-col items-center justify-center gap-2 py-3.5 xs:flex-row xs:justify-between'>
          <div>
            <h1 className='text-2xl font-semibold text-gray-700'>
              React Notes
            </h1>
          </div>
          <div>
            <label htmlFor='search' className='sr-only'>
              Search
            </label>
            <div className='relative w-full'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                <svg
                  aria-hidden='true'
                  className='h-5 w-5 text-gray-500'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' />
                </svg>
              </div>
              <input
                type='text'
                id='search'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                placeholder='Search...'
                required
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
