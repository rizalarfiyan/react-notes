import React, { useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FILTER_NOTE_TYPE, DEFAULT_FILTER_SLUG } from '../constants'
import NoteCard from './NoteCard'
import { classNames, deleteNote, toggleArchiveNote } from '../utils'
import Alert from './Alert'
import Skeleton from './Skeleton'
import Dropdown from './Dropdown'
import { useGlobalData } from '../hooks'

function Notes({ filter, onFilter }) {
  const defaultType = FILTER_NOTE_TYPE.find(
    (val) => val.slug === DEFAULT_FILTER_SLUG
  )

  const { getLang, lang } = useGlobalData()
  const [typeNote, setTypeNote] = useState(defaultType)
  const [rawNotes, setRawNotes] = useState([])
  const [fetchStatus, setFetchStatus] = useState({
    message: '',
    isLoading: true,
    isError: false,
  })

  const getFilterType = (value) => {
    const filterType = FILTER_NOTE_TYPE.find((val) => val.slug === value)
    if (!filterType) {
      return defaultType
    }
    return filterType
  }

  const updateFilter = (value, hasUpdateFilter = false) => {
    const filterType = getFilterType(value)
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

  const setLoading = (value) => {
    setFetchStatus((prev) => ({ ...prev, isLoading: value }))
  }

  const fetchData = async (type) => {
    setLoading(true)
    const data = await getFilterType(type).callback()
    setLoading(false)
    if (data.error) {
      setFetchStatus((prev) => ({
        ...prev,
        isError: true,
        message: data.message,
      }))
    }
    setRawNotes(data.data)
  }

  const handleDelete = async (id) => {
    const res = await deleteNote(id)
    return res
  }

  const handleToggleArchive = async (id, isArchive) => {
    const res = await toggleArchiveNote(id, isArchive)
    return res
  }

  const triggerFetchData = async () => {
    await fetchData(filter.type)
  }

  useEffect(() => {
    fetchData(filter.type)
  }, [filter.type])

  const notes = useMemo(() => {
    const searchRegex = filter.search && new RegExp(`${filter.search}`, 'gi')
    return rawNotes.filter(
      (note) => !searchRegex || searchRegex.test(note.title)
    )
  }, [rawNotes, filter.search])

  const notFoundTitle = useMemo(() => {
    return getLang('title.not-found', getLang(getFilterType(filter.type).name))
  }, [filter.type, lang])

  useEffect(() => {
    updateFilter(filter.type)
  }, [])

  return (
    <div className='container'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold text-gray-800'>
          {getLang('title.base')}
        </h1>
        <div>
          <label htmlFor='filter-note' className='sr-only'>
            {getLang('title.filter')}
          </label>
          <Dropdown
            id='filter-note'
            onChange={handleChangeFilter}
            value={typeNote.slug}
            data={FILTER_NOTE_TYPE}
            hasTranslation
          />
        </div>
      </div>
      <div
        className={classNames(
          'mt-8 mb-14',
          (fetchStatus.isLoading || notes.length > 0) &&
            'columns-1 md:columns-2 lg:columns-3'
        )}
      >
        {fetchStatus.isError && (
          <Alert variant='danger' message={fetchStatus.message} />
        )}
        {fetchStatus.isLoading ? (
          Array.from({ length: 6 }).map((val, idx) => {
            return <Skeleton.SkeletonNoteCard key={idx} />
          })
        ) : !notes.length > 0 ? (
          <Alert message={notFoundTitle} />
        ) : (
          notes.map((val) => {
            return (
              <NoteCard
                key={val.id}
                data={val}
                onDelete={handleDelete}
                onToggleArchive={handleToggleArchive}
                triggerFetchData={triggerFetchData}
              />
            )
          })
        )}
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
