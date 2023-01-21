import React, { useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import NotificationProvider from './NotificationProvider'
import { GlobalContext } from '../hooks'
import { LANGUAGE, DEFAULT_LANGUAGE, MODE, STORAGE_KEY } from '../constants'
import { getDarkMode, getObject, hasLocalStorage, stringFormat } from '../utils'
import {
  getAccessToken,
  getUserLogged,
  removeAccessToken,
} from '../utils/network-data'
import { LoadingScreen } from '../components'

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

  const darkModeElement = (isDark) => {
    if (isDark) {
      document.documentElement.dataset.mode = MODE.dark
    } else {
      document.documentElement.dataset.mode = MODE.light
    }
  }

  const toggleMode = () => {
    setIsDarkMode((prev) => !prev)
    const newDark = !isDarkMode
    darkModeElement(newDark)
    if (hasLocalStorage) {
      localStorage.setItem(STORAGE_KEY.theme, newDark ? MODE.dark : MODE.light)
    }
  }

  const defaultLang = LANGUAGE.find((val) => val.slug === DEFAULT_LANGUAGE)
  const [lang, setLang] = useState(defaultLang)

  const getLang = (value) => {
    const langData = LANGUAGE.find((val) => val.slug === value)
    if (!langData) {
      return defaultLang
    }
    return langData
  }

  const changeLang = (language) => {
    const langData = getLang(language)
    setLang(langData)
  }

  const handleLang = (key, ...rest) => {
    return stringFormat(getObject(key.toLowerCase(), lang.data) || key, ...rest)
  }

  useEffect(() => {
    setAppInfo((prev) => ({ ...prev, message: 'Fetching data...' }))
    darkModeElement(isDarkMode)
    fetchUser()
  }, [])

  const data = useMemo(() => {
    return {
      isDarkMode,
      toggleMode,
      auth,
      getUser: fetchUser,
      logout: clearAuth,
      lang,
      getLang: handleLang,
      changeLang,
    }
  }, [isDarkMode, auth, appInfo, lang])

  if (appInfo.isDone) {
    return (
      <GlobalContext.Provider value={data}>
        <NotificationProvider>{children}</NotificationProvider>
      </GlobalContext.Provider>
    )
  }

  return <LoadingScreen reason={appInfo.message} />
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default GlobalProvider
