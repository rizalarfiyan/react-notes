import React from 'react'

function SkeletonDetailNote() {
  return (
    <div role='status' className='container animate-pulse'>
      <div className='relative mx-auto mb-4 rounded-md bg-white p-6 shadow-sm'>
        <div className='mx-auto mb-3 h-8 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700' />
        <div className='absolute top-4 left-4'>
          <div className='h-6 w-20 rounded-md bg-gray-200 dark:bg-gray-700' />
        </div>
        <div className='mb-8 flex items-center justify-center gap-4'>
          {Array.from({ length: 2 }).map((val, idx) => {
            return (
              <div
                key={idx}
                className='h-3 w-1/6 rounded-md bg-gray-200 dark:bg-gray-700'
              />
            )
          })}
        </div>
        <div className='space-y-2'>
          {Array.from({ length: 12 }).map((val, idx) => {
            return (
              <div
                key={idx}
                className='h-2.5 w-full rounded-md bg-gray-200 dark:bg-gray-700'
              />
            )
          })}
          <div className='h-2.5 w-5/6 rounded-md bg-gray-200 dark:bg-gray-700' />
          <div className='h-2.5 w-1/2 rounded-md bg-gray-200 dark:bg-gray-700' />
        </div>
      </div>
      <div className='mt-4 flex items-center justify-end gap-3'>
        {Array.from({ length: 3 }).map((val, idx) => {
          return (
            <div
              key={idx}
              className='h-8 w-28 rounded-md bg-gray-300 dark:bg-gray-700'
            />
          )
        })}
      </div>
      <span className='sr-only'>Loading...</span>
    </div>
  )
}

export default SkeletonDetailNote
