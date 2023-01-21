import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../utils'

function MainContainer({ children, isCenter, className, ...rest }) {
  return (
    <main
      className={classNames(
        'flex min-h-[calc(100vh-60px)] min-w-full flex-col gap-16 pt-52 xxs:pt-40 xs:pt-28',
        isCenter && 'justify-center',
        className
      )}
      {...rest}
    >
      {children}
    </main>
  )
}

MainContainer.defaultProps = {
  className: '',
  isCenter: false,
}

MainContainer.propTypes = {
  className: PropTypes.string,
  isCenter: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

export default MainContainer
