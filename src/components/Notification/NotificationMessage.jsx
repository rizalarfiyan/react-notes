import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { notificationType } from '../../hooks'
import { DEFAULT_DURATION_NOTIFICATION } from '../../constants'
import { classNames } from '../../utils'
import Icon from '../Icon'

function NotificationMessage({ id, message, type, duration, onRemove }) {
  const getStyle = useMemo(() => {
    switch (type) {
      case notificationType.INFO:
        return {
          base: 'bg-white border-blue-500',
          iconstyle: 'text-blue-500',
          icon: 'info',
          name: 'Info',
        }
      case notificationType.ERROR:
        return {
          base: 'bg-white border-red-500',
          iconstyle: 'text-red-500',
          icon: 'error',
          name: 'Error',
        }
      case notificationType.WARNING:
        return {
          base: 'bg-white border-yellow-500',
          iconstyle: 'text-yellow-500',
          icon: 'warning',
          name: 'Warning',
        }
      case notificationType.SUCCESS:
        return {
          base: 'bg-white border-green-500',
          iconstyle: 'text-green-500',
          icon: 'success',
          name: 'Success',
        }
      default:
        return {}
    }
  }, [])

  useEffect(() => {
    if (duration && onRemove) {
      setTimeout(() => {
        onRemove(id)
      }, duration)
    }
  }, [duration])

  return (
    <div
      className={classNames(
        'hover:scale-102 visible flex max-h-40 w-full transform cursor-pointer flex-row rounded-md border-l-4 shadow-lg transition-all duration-100',
        getStyle.base
      )}
      onClick={() => onRemove && onRemove(id)}
      aria-hidden='true'
    >
      <div className='flex-no-wrap flex w-full flex-row gap-2 p-4'>
        {getStyle.icon && (
          <Icon
            name={getStyle.icon}
            className={classNames(
              'mx-auto mr-1 flex h-8 w-8 select-none items-center text-xl',
              getStyle.iconstyle
            )}
          />
        )}

        <div className='flex-no-wrap flex w-full flex-col px-1'>
          <div className='my-auto flex select-none font-bold text-gray-800'>
            {getStyle.name}
          </div>
          <p className='line-clamp-2 my-auto flex break-all text-sm leading-tight text-gray-500'>
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}

NotificationMessage.defaultProps = {
  message: '',
  type: notificationType.INFO,
  duration: DEFAULT_DURATION_NOTIFICATION,
}

NotificationMessage.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.string,
  type: PropTypes.string,
  duration: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
}

export default NotificationMessage
