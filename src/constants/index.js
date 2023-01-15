const APP_NAME = 'React Notes'
const MAX_TITLE = 50

const DEFAULT_FILTER_SLUG = 'all'
const DEFAULT_DURATION_NOTIFICATION = 3000

const FILTER_NOTE_TYPE = [
  {
    name: 'All',
    slug: 'all',
  },
  {
    name: 'Active',
    slug: 'active',
    filter: {
      key: 'archived',
      value: false,
    },
  },
  {
    name: 'Archived',
    slug: 'archived',
    filter: {
      key: 'archived',
      value: true,
    },
  },
]

const MODE = {
  dark: 'dark',
  light: 'light',
}

const STORAGE_KEY = {
  theme: 'theme',
}

export {
  APP_NAME,
  MAX_TITLE,
  DEFAULT_FILTER_SLUG,
  DEFAULT_DURATION_NOTIFICATION,
  FILTER_NOTE_TYPE,
  MODE,
  STORAGE_KEY,
}
