import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Search, CardInput, Notes } from '../components'

function ListNote({ parentRef }) {
  const [params, setParams] = useSearchParams()
  const [filter, setFilter] = useState({
    search: params.get('search') || '',
    type: params.get('type') || '',
  })

  useEffect(() => {
    setParams(filter)
  }, [filter])

  useEffect(() => {
    if (parentRef?.current?.classList) {
      parentRef.current.classList.remove('justify-center')
    }
    return () => {
      if (parentRef?.current?.classList) {
        parentRef.current.classList.add('justify-center')
      }
    }
  })

  return (
    <>
      <CardInput title='Search a Note'>
        <Search filter={filter} onSearch={setFilter} />
      </CardInput>
      <Notes filter={filter} onFilter={setFilter} />
    </>
  )
}

ListNote.propTypes = {
  parentRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) }),
  ]).isRequired,
}

export default ListNote
