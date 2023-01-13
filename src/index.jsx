import React from 'react'
import { createRoot } from 'react-dom/client'
import NotesPage from './components/NotesPage'

import './styles/style.css'

const root = createRoot(document.getElementById('root'))
root.render(<NotesPage />)
