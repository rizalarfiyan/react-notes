import React from 'react'
import { Link } from 'react-router-dom'
import { APP_NAME } from '../constants'
import { useGlobalData } from '../hooks'

function Title() {
  const { auth } = useGlobalData()
  return (
    <h1 className='text-2xl font-semibold text-gray-700 dark:text-white'>
      {auth ? <Link to='/'>{APP_NAME}</Link> : APP_NAME}
    </h1>
  )
}

export default Title
