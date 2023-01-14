import React from 'react'
import { Link } from 'react-router-dom'
import { APP_NAME } from '../constants'

function Title() {
  return (
    <Link to='.'>
      <h1 className='text-2xl font-semibold text-gray-700'>{APP_NAME}</h1>
    </Link>
  )
}

export default Title
