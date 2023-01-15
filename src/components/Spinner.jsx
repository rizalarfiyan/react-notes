import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../utils'

function Spinner({ className, size, ...rest }) {
  const getSize = useMemo(() => {
    switch (size) {
      case 'xs':
        return 'w-3 h-3'
      case 'sm':
        return 'w-4 h-4'
      case 'lg':
        return 'w-8 h-8'
      case 'xl':
        return 'w-12 h-12'
      default:
        return 'w-6 h-6'
    }
  }, [size])

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      stroke='currentColor'
      className={classNames('animate-spin', getSize, className)}
      fill='none'
      viewBox='0 0 66 66'
      {...rest}
    >
      <circle
        cx='33'
        cy='33'
        fill='none'
        r='28'
        stroke='currentColor'
        strokeWidth='10'
        className='opacity-30'
      />
      <circle
        cx='33'
        cy='33'
        fill='none'
        r='28'
        stroke='currentColor'
        strokeDasharray='40, 134'
        strokeDashoffset='325'
        strokeLinecap='round'
        strokeWidth='10'
        className='opacity-70'
      />
    </svg>
  )
}

Spinner.defaultProps = {
  className: '',
  size: 'md',
}

Spinner.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
}

export default Spinner
