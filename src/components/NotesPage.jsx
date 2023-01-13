import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

class NotesPage extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <main className='flex min-h-[calc(100vh-60px)] min-w-full items-center justify-center pt-28 xs:pt-16'>
          <h1 className='text-4xl font-semibold text-gray-700'>Hello Word!</h1>
        </main>
        <Footer />
      </>
    )
  }
}

export default NotesPage
