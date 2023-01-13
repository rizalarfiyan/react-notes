import React from 'react'
import Navbar from './Navbar'

class NotesPage extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <div className='flex min-h-[1000px] min-w-full items-center justify-center'>
          <h1 className='text-4xl font-semibold text-gray-700'>Hello Word!</h1>
        </div>
      </>
    )
  }
}

export default NotesPage
