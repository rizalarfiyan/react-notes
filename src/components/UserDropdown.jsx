import React, { useEffect, useRef, useState } from 'react'
import { classNames, gravatarUrl } from '../utils'
import { useGlobalData } from '../hooks'

function UserDropdown() {
  const { auth, logout, getLang } = useGlobalData()

  const [isOpen, setIsOpen] = useState(false)
  const toggleDropdown = () => setIsOpen((prev) => !prev)
  const handleLogout = () => logout()

  const wrapperRef = useRef(null)
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef])

  if (!auth) {
    return ''
  }

  return (
    <div className='relative' ref={wrapperRef}>
      <div
        className='ml-2 h-12 w-12 cursor-pointer overflow-hidden rounded-full bg-gray-200 dark:bg-gray-400'
        onClick={toggleDropdown}
        aria-hidden='true'
      >
        <img src={gravatarUrl(auth.email)} alt={auth.name} />
      </div>
      <div
        className={classNames(
          'absolute right-0 z-10 w-44 divide-y divide-gray-100 rounded bg-white shadow transition-all duration-300 dark:divide-gray-600 dark:bg-gray-700',
          isOpen ? 'opacity-1 visible top-[74px]' : 'invisible top-20 opacity-0'
        )}
      >
        <div className='px-4 py-2'>
          <h4 className='truncate text-base font-medium text-gray-700 dark:text-gray-100'>
            {auth.name}
          </h4>
          <p className='truncate text-sm text-gray-600 dark:text-gray-300'>
            {auth.email}
          </p>
        </div>
        <ul className='py-1 text-left text-sm text-gray-700 dark:text-gray-200'>
          <li>
            <button
              type='button'
              onClick={handleLogout}
              className='flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
            >
              {getLang('action.logout')}
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default UserDropdown
