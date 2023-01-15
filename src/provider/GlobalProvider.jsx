import React, { useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import NotificationProvider from './NotificationProvider'
import { GlobalContext } from '../hooks'
import { MODE, STORAGE_KEY } from '../constants'
import { getDarkMode, hasLocalStorage } from '../utils'
import {
  getAccessToken,
  getUserLogged,
  removeAccessToken,
} from '../utils/network-data'

function GlobalProvider({ children }) {
  const isInitialDark = getDarkMode() || false
  const [isDarkMode, setIsDarkMode] = useState(isInitialDark)
  const [auth, setAuth] = useState(undefined)
  const [appInfo, setAppInfo] = useState({
    isError: false,
    isDone: false,
    message: 'Init the app...',
  })

  const clearAuth = () => {
    setAuth(undefined)
    removeAccessToken()
  }

  const fetchUser = async () => {
    if (!getAccessToken()) {
      setAppInfo({
        isError: false,
        isDone: true,
        message: 'Load the app...',
      })
      return
    }
    const userData = await getUserLogged()
    if (!userData.error) {
      setAuth(userData.data)
      setAppInfo({
        isError: false,
        isDone: true,
        message: userData.message,
      })
      return
    }
    clearAuth()
    setAppInfo({
      isError: userData.error,
      isDone: true,
      message: userData.message,
    })
  }

  useEffect(() => {
    setAppInfo((prev) => ({ ...prev, message: 'Fetching data...' }))
    fetchUser()
  }, [])

  const data = useMemo(() => {
    return {
      isDarkMode,
      toggleMode: () => {
        setIsDarkMode((prev) => !prev)
        if (isDarkMode) {
          document.documentElement.dataset.mode = MODE.dark
        } else {
          document.documentElement.dataset.mode = MODE.light
        }
        if (hasLocalStorage) {
          localStorage.setItem(
            STORAGE_KEY.theme,
            isDarkMode ? MODE.dark : MODE.light
          )
        }
      },
      auth,
      getUser: fetchUser,
      logout: clearAuth,
    }
  }, [isDarkMode, auth, appInfo])

  if (appInfo.isDone) {
    return (
      <GlobalContext.Provider value={data}>
        <NotificationProvider>{children}</NotificationProvider>
      </GlobalContext.Provider>
    )
  }

  return <div>{appInfo.message}</div>
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default GlobalProvider
