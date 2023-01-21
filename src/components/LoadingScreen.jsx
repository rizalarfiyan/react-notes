import React from 'react'
import PropTypes from 'prop-types'
import Spinner from './Spinner'

function LoadingScreen({ reason }) {
  return (
    <div className='loading-screen mx-auto flex min-h-screen w-full items-center justify-center'>
      <div className='flex flex-col items-center'>
        <Spinner size='xl' className='dark:text-gray-300' />
        {reason && (
          <span className='mt-4 max-w-[220px] text-center text-base text-gray-800 dark:text-gray-300'>
            {reason}
          </span>
        )}
      </div>
    </div>
  )
}

LoadingScreen.defaultProps = {
  reason: '',
}

LoadingScreen.propTypes = {
  reason: PropTypes.string,
}

export default LoadingScreen
