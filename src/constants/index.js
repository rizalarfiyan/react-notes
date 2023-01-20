import en from '../lang/en.json'
import id from '../lang/id.json'
import { getActiveNotes, getArchivedNotes } from '../utils'

const APP_NAME = 'React Notes'
const API_BASE_URL = 'https://notes-api.dicoding.dev/v1'
const MAX_TITLE = 50

const DEFAULT_FILTER_SLUG = 'active'
const DEFAULT_DURATION_NOTIFICATION = 3000
const DEFAULT_LANGUAGE = 'en'

const FILTER_NOTE_TYPE = [
  {
    name: 'note.type.active',
    slug: 'active',
    callback: async () => {
      const data = await getActiveNotes()
      return data
    },
  },
  {
    name: 'note.type.archived',
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

const LANGUAGE = [
  {
    name: 'EN',
    slug: 'en',
    dateLocale: 'en-EN',
    data: en,
  },
  {
    name: 'ID',
    slug: 'id',
    dateLocale: 'id-ID',
    data: id,
  },
]

export {
  API_BASE_URL,
  APP_NAME,
  MAX_TITLE,
  DEFAULT_FILTER_SLUG,
  DEFAULT_DURATION_NOTIFICATION,
  DEFAULT_LANGUAGE,
  FILTER_NOTE_TYPE,
  MODE,
  STORAGE_KEY,
  LANGUAGE,
}
