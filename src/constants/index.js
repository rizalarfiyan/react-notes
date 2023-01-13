const APP_NAME = 'React Notes'
const MAX_TITLE = 50
const FILTER = [
  {
    name: 'all',
  },
  {
    name: 'Active',
    filter: {
      key: 'archived',
      value: false,
    },
  },
  {
    name: 'Archived',
    filter: {
      key: 'archived',
      value: true,
    },
  },
]

export { APP_NAME, MAX_TITLE, FILTER }
