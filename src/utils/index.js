import {
  DEFAULT_FILTER_SLUG,
  FILTER_NOTE_TYPE,
  STORAGE_KEY,
} from '../constants'

const showFormattedDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return new Date(date).toLocaleDateString('id-ID', options)
}

const getYear = () => {
  const currentYear = new Date().getFullYear()
  let yearDate = currentYear
  if (currentYear !== 2023) {
    yearDate = `2023 - ${currentYear}`
  }
  return yearDate
}

const classNames = (...args) => args.filter(Boolean).join(' ')

const getFilterNoteType = (slug) => {
  const filterType = FILTER_NOTE_TYPE.find((val) => val.slug === slug)
  if (filterType) return filterType
  return FILTER_NOTE_TYPE.find((val) => val.slug === DEFAULT_FILTER_SLUG)
}

const hasLocalStorage = typeof Storage !== 'undefined'

const getDarkMode = () => {
  const getGlobalTheme = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
  if (!hasLocalStorage) return getGlobalTheme
  return (
    localStorage[STORAGE_KEY.theme] === 'dark' ||
    (!(STORAGE_KEY.theme in localStorage) && getGlobalTheme)
  )
}

export {
  showFormattedDate,
  getYear,
  classNames,
  getFilterNoteType,
  hasLocalStorage,
  getDarkMode,
}
