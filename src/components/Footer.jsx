import React from 'react'
import { getYear } from '../utils'

function Footer() {
  return (
    <footer>
      <div className='container'>
        <div className='border-t border-gray-200 py-4 text-center text-gray-600'>
          <span>Copyright &#169; {getYear()} </span>
          <a href='https://github.com/rizalarfiyan'>Rizal Arfiyan</a>
          <span> | All right reversed.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
