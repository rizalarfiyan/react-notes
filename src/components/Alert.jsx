import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../utils'

function Alert({ message, variant }) {
  const getVariant = useMemo(() => {
    switch (variant) {
      case 'danger':
        return 'bg-red-100 text-red-700'
      case 'warning':
        return 'bg-yellow-100 text-yellow-700'
      case 'success':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-blue-100 text-blue-700'
    }
  }, [variant])

  return (
    <div
      className={classNames(
        'flex justify-center rounded-lg py-4 px-6 text-sm',
        getVariant
      )}
      role='alert'
    >
      <span>{message}</span>
    </div>
  )
}

Alert.defaultProps = {
  variant: 'primary',
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.string,
}

export default Alert
