import React, { useState } from 'react'
import { Search, CardInput, Notes } from '../components'

function ListNote() {
  const [search, setSearch] = useState('')

  return (
    <>
      <CardInput title='Search a Note'>
        <Search onSearch={setSearch} />
      </CardInput>
      <Notes search={search} />
    </>
  )
}

export default ListNote
