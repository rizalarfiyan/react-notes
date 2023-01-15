import { createContext, useContext } from 'react'
import { DEFAULT_DURATION_NOTIFICATION } from '../constants'

const NotificationContext = createContext()
const useNotification = () => useContext(NotificationContext)

const initialNotification = []
const notificationAction = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  REMOVE_ALL: 'REMOVE_ALL',
}
const notificationType = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  INFO: 'INFO',
  WARNING: 'WARNING',
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case notificationAction.ADD:
      return [
        ...state,
        {
          id: (+new Date()).toString(),
          content: {
            message: action.payload.content.message || '',
            duration:
              action.payload.content.duration || DEFAULT_DURATION_NOTIFICATION,
          },
          type: action.payload.type,
        },
      ]
    case notificationAction.REMOVE:
      return state.filter((val) => val.id !== action.payload.id)
    case notificationAction.REMOVE_ALL:
      return initialNotification
    default:
      return state
  }
}

export {
  NotificationContext,
  initialNotification,
  notificationAction,
  notificationType,
  notificationReducer,
  useNotification,
}
