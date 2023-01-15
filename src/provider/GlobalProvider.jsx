import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import NotificationProvider from './NotificationProvider'
import { GlobalContext } from '../hooks'
import { MODE, STORAGE_KEY } from '../constants'
import { getDarkMode, hasLocalStorage } from '../utils'

function GlobalProvider({ children }) {
  const isInitialDark = getDarkMode() || false
  const [isDarkMode, setIsDarkMode] = useState(isInitialDark)

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
    }
  }, [isDarkMode])

  return (
    <GlobalContext.Provider value={data}>
      <NotificationProvider>{children}</NotificationProvider>
    </GlobalContext.Provider>
  )
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default GlobalProvider
