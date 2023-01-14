import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='mx-auto flex min-h-full w-full max-w-[320px] flex-col items-center justify-center text-center leading-snug'>
      <h1 className='-mb-8 text-8xl font-bold tracking-wider text-gray-200'>
        404
      </h1>
      <h2 className='text-2xl font-semibold text-gray-700'>Page Not Found</h2>
      <p className='mt-2 text-gray-500'>
        The Page you are looking for doesn&apos;t exist or an other error
        occured. Go to{' '}
        <Link to='.' className='text-gray-700 underline'>
          home page
        </Link>
      </p>
    </div>
  )
}

export default NotFound
