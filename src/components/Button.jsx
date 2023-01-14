import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../utils'

function Button({
  isSubmit,
  isDisabled,
  leftIcon,
  rightIcon,
  children,
  isFluid,
  variant,
  size,
  ...rest
}) {
  const getVariant = useMemo(() => {
    switch (variant) {
      case 'danger':
        return 'border-red-600 bg-red-500 text-white hover:bg-red-600 focus:border-red-500 focus:bg-red-700 focus:ring-red-500 active:bg-red-600'
      case 'warning':
        return 'border-yellow-600 bg-yellow-500 text-white hover:bg-yellow-600 focus:border-yellow-500 focus:bg-yellow-700 focus:ring-yellow-500 active:bg-yellow-600'
      case 'success':
        return 'border-green-600 bg-green-500 text-white hover:bg-green-600 focus:border-green-500 focus:bg-green-700 focus:ring-green-500 active:bg-green-600'
      default:
        return 'border-blue-600 bg-blue-500 text-white hover:bg-blue-600 focus:border-blue-500 focus:bg-blue-700 focus:ring-blue-500 active:bg-blue-600'
    }
  }, [variant])

  const getSize = useMemo(() => {
    switch (size) {
      case 'xs':
        return 'h-7 min-w-[1.75rem] px-2 text-xs leading-4'
      case 'sm':
        return 'h-8 min-h-[2rem] px-4 text-sm leading-5'
      case 'lg':
        return 'h-11 min-h-[2.75rem] px-4 text-base leading-6'
      case 'xl':
        return 'h-[3.125rem] min-h-[3.125rem] px-6 text-lg'
      default:
        return 'h-9 min-h-[2.25rem] px-4 text-base leading-5'
    }
  }, [size])

  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={classNames(
        'relative m-0 inline-flex flex-shrink-0 cursor-pointer select-none appearance-none items-center justify-center whitespace-nowrap rounded-md align-middle font-medium leading-tight outline-none duration-75 ease-out focus:outline-none',
        getVariant,
        getSize,
        isFluid && 'w-full'
      )}
      {...rest}
    >
      {leftIcon || null}
      {children}
      {rightIcon || null}
    </button>
  )
}

Button.defaultProps = {
  isDisabled: false,
  isSubmit: false,
  isFluid: false,
  leftIcon: '',
  rightIcon: '',
  variant: 'primary',
  size: 'md',
}

Button.propTypes = {
  isDisabled: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  children: PropTypes.node.isRequired,
  isSubmit: PropTypes.bool,
  isFluid: PropTypes.bool,
  variant: PropTypes.string,
  size: PropTypes.string,
}

export default Button
