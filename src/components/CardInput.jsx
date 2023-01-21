import React from 'react'
import PropTypes from 'prop-types'

function CardInput({ children, title }) {
  return (
    <div className='container'>
      <div className='mx-auto max-w-2xl'>
        <div className='relative mt-5 flex flex-col items-center rounded-lg bg-white py-5 px-8 shadow-sm dark:bg-gray-700'>
          <div className='-mt-12 mb-4 rounded-md bg-white px-5 py-3 shadow-lg dark:bg-gray-600'>
            <h2 className='text-center text-2xl font-semibold text-gray-700 dark:text-white'>
              {title}
            </h2>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

CardInput.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default CardInput
