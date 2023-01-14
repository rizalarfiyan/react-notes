import React, { useState } from 'react'
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
  ...rest
}) {
  const [length, setLength] = useState(0)
  const hasLimit = limit !== 0
  const isLimit = length === limit

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

  return (
    <div>
      <label
        htmlFor={id}
        className={classNames(
          title !== ''
            ? `mb-2 block text-sm font-medium ${
                hasLimit && isLimit ? 'text-red-500' : 'text-gray-900'
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
          hasLimit && isLimit
            ? 'border-red-300 bg-red-50 text-red-900 focus:outline-red-500 focus:ring-red-500'
            : 'border-gray-300 bg-gray-50 text-gray-900 focus:outline-blue-500 focus:ring-blue-500',
          Element === 'textarea' && 'max-h-[220px] min-h-[44px]'
        )}
        onChange={handleChange}
        {...rest}
      />
      {hasLimit && (
        <p
          className={classNames(
            'mt-1 text-right text-sm',
            isLimit ? 'text-red-500' : 'text-gray-600'
          )}
        >
          {length}/{limit}
        </p>
      )}
    </div>
  )
}

Input.defaultProps = {
  as: 'input',
  type: 'text',
  title: '',
  limit: 0,
  onChange: () => {},
}

Input.propTypes = {
  as: PropTypes.oneOf(['input', 'textarea']),
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  limit: PropTypes.number,
  onChange: PropTypes.func,
}

export default Input
