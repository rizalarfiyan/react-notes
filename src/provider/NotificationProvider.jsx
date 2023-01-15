import React, { useMemo, useReducer } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import { Notification } from '../components'
import {
  initialNotification,
  notificationAction,
  NotificationContext,
  notificationReducer,
  notificationType,
} from '../hooks'

function NotificationProvider({ children }) {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialNotification
  )

  const data = useMemo(() => {
    return {
      success: (message, duration) => {
        notificationDispatch({
          type: notificationAction.ADD,
          payload: {
            type: notificationType.SUCCESS,
            content: {
              message,
              duration,
            },
          },
        })
      },
      error: (message, duration) => {
        notificationDispatch({
          type: notificationAction.ADD,
          payload: {
            type: notificationType.ERROR,
            content: {
              message,
              duration,
            },
          },
        })
      },
      info: (message, duration) => {
        notificationDispatch({
          type: notificationAction.ADD,
          payload: {
            type: notificationType.INFO,
            content: {
              message,
              duration,
            },
          },
        })
      },
      warning: (message, duration) => {
        notificationDispatch({
          type: notificationAction.ADD,
          payload: {
            type: notificationType.WARNING,
            content: {
              message,
              duration,
            },
          },
        })
      },
    }
  }, [])

  return (
    <NotificationContext.Provider value={data}>
      {children}
      {createPortal(
        <Notification.NotificationWrapper
          data={{
            notification,
            notificationDispatch,
          }}
        />,
        document.body
      )}
    </NotificationContext.Provider>
  )
}

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default NotificationProvider
