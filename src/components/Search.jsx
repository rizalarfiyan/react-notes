import React from 'react'
import PropTypes from 'prop-types'
import Icon from './Icon'

function Search({ onSearch }) {
  const handleSearch = (event) => {
    onSearch(event.target.value)
    event.preventDefault()
  }

  return (
    <div className='w-full py-4'>
      <label htmlFor='search' className='sr-only'>
        Search
      </label>
      <div className='relative w-full'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <Icon name='search' className='h-5 w-5 text-gray-500' />
        </div>
        <input
          type='text'
          id='search'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
          placeholder='Search...'
          onChange={handleSearch}
          required
        />
      </div>
    </div>
  )
}
Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
}

export default Search
