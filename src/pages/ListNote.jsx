import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, CardInput, Notes } from '../components'

function ListNote() {
  const [params, setParams] = useSearchParams()
  const [filter, setFilter] = useState({
    search: params.get('search') || '',
    type: params.get('type') || '',
  })

  useEffect(() => {
    setParams(filter)
  }, [filter])

  return (
    <>
      <CardInput title='Search a Note'>
        <Search filter={filter} onSearch={setFilter} />
      </CardInput>
      <Notes filter={filter} onFilter={setFilter} />
    </>
  )
}

export default ListNote
