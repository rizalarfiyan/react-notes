import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { FILTER_NOTE } from '../constants'
import NoteCard from './NoteCard'
import { classNames } from '../utils'
import Alert from './Alert'

function Notes({ data, search, onDelete, onToggleArchive }) {
  const [filter, setFilter] = useState(undefined)

  const handleChangeFilter = (event) => {
    setFilter(FILTER_NOTE[event.target.value].filter)
    event.preventDefault()
  }

  const notes = useMemo(() => {
    const searchRegex = search && new RegExp(`${search}`, 'gi')
    return data.filter(
      (val) =>
        (!searchRegex || searchRegex.test(val.title)) &&
        (!filter || val[filter.key] === filter.value)
    )
  }, [data, search, filter])

  const hasNote = notes.length > 0
  return (
    <div className='container'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold text-gray-800'>My Notes</h1>
        <div>
          <label htmlFor='filter-note' className='sr-only'>
            Filter Note
          </label>
          <select
            id='filter-note'
            className='block w-32 appearance-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-3.5 text-sm text-gray-900 focus:outline-blue-500 focus:ring-blue-500'
            onChange={handleChangeFilter}
          >
            {FILTER_NOTE.map((val, idx) => {
              return (
                <option key={idx} value={idx} defaultValue={idx === 0}>
                  {val.name}
                </option>
              )
            })}
          </select>
        </div>
      </div>
      <div
        className={classNames(
          'mt-8 mb-14',
          hasNote && 'columns-1 md:columns-2 lg:columns-3'
        )}
      >
        {!hasNote && <Alert message='Note not found!' />}
        {notes.map((val) => {
          return (
            <NoteCard
              key={val.id}
              data={val}
              onDelete={onDelete}
              onToggleArchive={onToggleArchive}
            />
          )
        })}
      </div>
    </div>
  )
}

Notes.defaultProps = {
  search: '',
}

Notes.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool,
    })
  ).isRequired,
  search: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onToggleArchive: PropTypes.func.isRequired,
}

export default Notes
