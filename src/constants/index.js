import { getActiveNotes, getArchivedNotes } from '../utils'

const APP_NAME = 'React Notes'
const API_BASE_URL = 'https://notes-api.dicoding.dev/v1'
const MAX_TITLE = 50

const DEFAULT_FILTER_SLUG = 'active'
const DEFAULT_DURATION_NOTIFICATION = 3000

const FILTER_NOTE_TYPE = [
  {
    name: 'Active',
    slug: 'active',
    callback: async () => {
      const data = await getActiveNotes()
      return data
    },
  },
  {
    name: 'Archived',
    slug: 'archived',
    callback: async () => {
      const data = await getArchivedNotes()
      return data
    },
  },
]

const MODE = {
  dark: 'dark',
  light: 'light',
}

const STORAGE_KEY = {
  theme: 'theme',
  accessToken: 'accessToken',
}

export {
  API_BASE_URL,
  APP_NAME,
  MAX_TITLE,
  DEFAULT_FILTER_SLUG,
  DEFAULT_DURATION_NOTIFICATION,
  FILTER_NOTE_TYPE,
  MODE,
  STORAGE_KEY,
}
