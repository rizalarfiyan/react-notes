import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../utils'

function Input({
  as: Element,
  id,
  type,
  name,
  title,
  limit,
  onChange,
  value,
  error,
  ...rest
}) {
  const [length, setLength] = useState(0)
  const hasLimit = limit !== 0
  const isLimit = length === limit
  const hasError = error !== ''
  const hasErrorLimit = (hasLimit && isLimit) || hasError

  const handleChange = (event) => {
    if (!hasLimit) {
      onChange(event)
      return
    }
    const getLength = event.target.value.length
    setLength(getLength)
    if (getLength >= limit) return
    onChange(event)
  }

  useEffect(() => {
    setLength(value.length)
  }, [])

  return (
    <div>
      <label
        htmlFor={id}
        className={classNames(
          title !== ''
            ? `mb-2 block text-sm font-medium ${
                hasErrorLimit
                  ? 'text-red-500 dark:text-red-400'
                  : 'text-gray-900 dark:text-white'
              }`
            : 'sr-only'
        )}
      >
        {title}
      </label>
      <Element
        type={type}
        name={name}
        id={id}
        className={classNames(
          'block w-full rounded-lg border p-2.5 text-sm',
          hasErrorLimit
            ? 'dark border-red-300 bg-red-50 text-red-900 placeholder:text-red-400 focus:outline-red-500 focus:ring-red-500'
            : 'border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-500 dark:text-white dark:placeholder:text-gray-300',
          Element === 'textarea' && 'max-h-[220px] min-h-[44px]'
        )}
        onChange={handleChange}
        value={value}
        {...rest}
      />
      <div className='flex items-start justify-between'>
        {hasError ? (
          <p className='mt-1 text-left text-sm text-red-500 dark:text-red-400'>
            {error}
          </p>
        ) : (
          <p />
        )}
        {hasLimit && (
          <p
            className={classNames(
              'mt-1 text-right text-sm',
              isLimit ? 'text-red-500 dark:text-red-400' : 'text-gray-600'
            )}
          >
            {length}/{limit}
          </p>
        )}
      </div>
    </div>
  )
}

Input.defaultProps = {
  as: 'input',
  type: 'text',
  title: '',
  limit: 0,
  onChange: () => {},
  value: '',
  error: '',
}

Input.propTypes = {
  as: PropTypes.oneOf(['input', 'textarea']),
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  limit: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.string,
  error: PropTypes.string,
}

export default Input
