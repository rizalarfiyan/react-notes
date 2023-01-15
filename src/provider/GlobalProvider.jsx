import React from 'react'
import PropTypes from 'prop-types'
import NotificationProvider from './NotificationProvider'

function GlobalProvider({ children }) {
  return <NotificationProvider>{children}</NotificationProvider>
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default GlobalProvider
