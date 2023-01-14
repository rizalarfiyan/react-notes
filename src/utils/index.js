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

export { showFormattedDate, getYear, classNames }
