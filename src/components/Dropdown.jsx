import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../utils'
import { useGlobalData } from '../hooks'

function Dropdown({
  data,
  className,
  dataKey,
  dataValue,
  hasTranslation,
  ...rest
}) {
  const { getLang } = useGlobalData()

  return (
    <select
      className={classNames(
        'block w-32 appearance-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-3.5 text-sm text-gray-900 focus:outline-blue-500 focus:ring-blue-500',
        className
      )}
      {...rest}
    >
      {data.map((val, idx) => {
        const getValue = val?.[dataValue]
        return (
          <option key={idx} value={val?.[dataKey] || idx}>
            {getValue ? (hasTranslation ? getLang(getValue) : getValue) : idx}
          </option>
        )
      })}
    </select>
  )
}

Dropdown.defaultProps = {
  className: '',
  dataKey: 'slug',
  dataValue: 'name',
  hasTranslation: false,
}

Dropdown.propTypes = {
  data: PropTypes.array.isRequired,
  className: PropTypes.string,
  dataKey: PropTypes.string,
  dataValue: PropTypes.string,
  hasTranslation: PropTypes.bool,
}

export default Dropdown
