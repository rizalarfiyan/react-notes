import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useGlobalData, useNotification } from '../hooks'

function GuardedRoute({ requireAuth, redirectAuth }) {
  const { auth } = useGlobalData()
  const location = useLocation()
  const notification = useNotification()
  const isRequiredAuth = !auth && requireAuth
  const isAuth = auth && redirectAuth

  useEffect(() => {
    if (isRequiredAuth) {
      notification.info('Login required!')
    }
    if (isAuth) {
      notification.info('Already login!')
    }
  }, [])

  if (isRequiredAuth) {
    return <Navigate to='/login' state={{ from: location }} />
  }

  if (isAuth) {
    return <Navigate to='/' replace />
  }

  return <Outlet />
}

GuardedRoute.defaultProps = {
  requireAuth: false,
  redirectAuth: false,
}

GuardedRoute.propTypes = {
  requireAuth: PropTypes.bool,
  redirectAuth: PropTypes.bool,
}

export default GuardedRoute
