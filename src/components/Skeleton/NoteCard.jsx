import React from 'react'

function SkeletonNoteCard() {
  return (
    <div
      role='status'
      className='mx-auto mb-4 animate-pulse space-y-4 rounded-md bg-white p-6 shadow-sm'
    >
      <div className='h-5 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700' />
      <div className='space-y-1.5'>
        {Array.from({ length: 6 }).map((val, idx) => {
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
      <div className='flex gap-2'>
        {Array.from({ length: 3 }).map((val, idx) => {
          return (
            <div
              key={idx}
              className='h-8 w-full rounded-md bg-gray-200 dark:bg-gray-700'
            />
          )
        })}
      </div>
      <span className='sr-only'>Loading...</span>
    </div>
  )
}

export default SkeletonNoteCard
