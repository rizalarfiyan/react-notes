import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CreateNote from './components/CreateNote'

function App() {
  return (
    <>
      <Navbar />
      <main className='flex min-h-[calc(100vh-60px)] min-w-full flex-col gap-6 pt-32 xs:pt-28'>
        <CreateNote />
      </main>
      <Footer />
    </>
  )
}

export default App
