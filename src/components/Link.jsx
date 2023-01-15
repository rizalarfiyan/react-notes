import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { classNames } from '../utils'

function Button({
  leftIcon,
  rightIcon,
  children,
  isFluid,
  variant,
  size,
  className,
  ...rest
}) {
  const getVariant = useMemo(() => {
    switch (variant) {
      case 'danger':
        return 'border-current bg-transparent text-red-600 hover:bg-red-50 focus:bg-red-100'
      case 'warning':
        return 'border-current bg-transparent text-yellow-600 hover:bg-yellow-50 focus:bg-yellow-100'
      case 'success':
        return 'border-current bg-transparent text-green-600 hover:bg-green-50 focus:bg-green-100'
      default:
        return 'border-current bg-transparent text-blue-600 hover:bg-blue-50 focus:bg-blue-100'
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
    <Link
      className={classNames(
        'relative m-0 inline-flex flex-shrink-0 cursor-pointer select-none appearance-none items-center justify-center whitespace-nowrap rounded-md border bg-transparent align-middle font-medium leading-tight shadow-sm outline-none duration-75 ease-out',
        getVariant,
        getSize,
        isFluid && 'w-full',
        className
      )}
      {...rest}
    >
      {leftIcon || null}
      {children}
      {rightIcon || null}
    </Link>
  )
}

Button.defaultProps = {
  isFluid: false,
  leftIcon: '',
  rightIcon: '',
  variant: 'info',
  size: 'md',
  className: '',
}

Button.propTypes = {
  className: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  children: PropTypes.node.isRequired,
  isFluid: PropTypes.bool,
  variant: PropTypes.oneOf(['danger', 'warning', 'success', 'info']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
}

export default Button
