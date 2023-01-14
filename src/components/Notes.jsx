import React, { useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FILTER_NOTE_TYPE, DEFAULT_FILTER_SLUG } from '../constants'
import NoteCard from './NoteCard'
import { classNames } from '../utils'
import Alert from './Alert'
import {
  deleteNote,
  getFilterNotes,
  toggleArchiveNote,
} from '../utils/local-data'

function Notes({ filter, onFilter }) {
  const defaultType = FILTER_NOTE_TYPE.find(
    (val) => val.slug === DEFAULT_FILTER_SLUG
  )

  const [typeNote, setTypeNote] = useState(defaultType)
  const [signal, setSignal] = useState(0)

  const updateFilter = (value, hasUpdateFilter = false) => {
    let filterType = FILTER_NOTE_TYPE.find((val) => val.slug === value)
    if (!filterType) {
      filterType = defaultType
    }
    if (hasUpdateFilter) {
      onFilter((prev) => ({
        ...prev,
        type: filterType.slug,
      }))
    }
    setTypeNote(filterType)
  }

  const handleChangeFilter = (event) => {
    updateFilter(event.target.value, true)
    event.preventDefault()
  }

  const handleDelete = (id) => {
    deleteNote(id)
    setSignal((prev) => prev + 1)
  }

  const handleToggleArchive = (id) => {
    toggleArchiveNote(id)
    setSignal((prev) => prev + 1)
  }

  const notes = useMemo(() => {
    const searchRegex = filter.search && new RegExp(`${filter.search}`, 'gi')
    const callbackSearch = (val) => {
      return (
        (!searchRegex || searchRegex.test(val.title)) &&
        (!typeNote.filter || val[typeNote.filter.key] === typeNote.filter.value)
      )
    }
    return getFilterNotes(callbackSearch)
  }, [filter.search, typeNote.filter, signal])

  useEffect(() => {
    updateFilter(filter.type)
  }, [])

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
            value={typeNote.slug}
          >
            {FILTER_NOTE_TYPE.map((val, idx) => {
              return (
                <option key={idx} value={val.slug}>
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
              onDelete={handleDelete}
              onToggleArchive={handleToggleArchive}
            />
          )
        })}
      </div>
    </div>
  )
}

Notes.propTypes = {
  filter: PropTypes.shape({
    search: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onFilter: PropTypes.func.isRequired,
}

export default Notes
