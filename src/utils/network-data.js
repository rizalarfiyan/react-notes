import { API_BASE_URL, STORAGE_KEY } from '../constants'

const getAccessToken = () => {
  return localStorage.getItem(STORAGE_KEY.accessToken)
}
const putAccessToken = (accessToken) => {
  return localStorage.setItem(STORAGE_KEY.accessToken, accessToken)
}
const removeAccessToken = () => {
  return localStorage.removeItem(STORAGE_KEY.accessToken)
}

const fetchWithToken = async (url, options = {}) => {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  })
}

const login = async ({ email, password }) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return {
      error: true,
      code: response.status,
      data: null,
      message: responseJson.message,
    }
  }

  return {
    error: false,
    code: response.status,
    data: responseJson.data,
    message: responseJson.message,
  }
}

const register = async ({ name, email, password }) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return {
      error: true,
      code: response.status,
      data: null,
      message: responseJson.message,
    }
  }

  return {
    error: false,
    code: response.status,
    data: null,
    message: responseJson.message,
  }
}

const getUserLogged = async () => {
  const response = await fetchWithToken(`${API_BASE_URL}/users/me`)
  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return {
      error: true,
      code: response.status,
      data: null,
      message: responseJson.message,
    }
  }

  return {
    error: false,
    code: response.status,
    data: responseJson.data,
    message: responseJson.message,
  }
}

const addNote = async ({ title, body }) => {
  const response = await fetchWithToken(`${API_BASE_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body }),
  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return {
      error: true,
      code: response.status,
      data: null,
      message: responseJson.message,
    }
  }

  return {
    error: false,
    code: response.status,
    data: responseJson.data,
    message: responseJson.message,
  }
}

const getActiveNotes = async () => {
  const response = await fetchWithToken(`${API_BASE_URL}/notes`)
  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return {
      error: true,
      code: response.status,
      data: null,
      message: responseJson.message,
    }
  }

  return {
    error: false,
    code: response.status,
    data: responseJson.data,
    message: responseJson.message,
  }
}

const getArchivedNotes = async () => {
  const response = await fetchWithToken(`${API_BASE_URL}/notes/archived`)
  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return {
      error: true,
      code: response.status,
      data: null,
      message: responseJson.message,
    }
  }

  return {
    error: false,
    code: response.status,
    data: responseJson.data,
    message: responseJson.message,
  }
}

const getNote = async (id) => {
  const response = await fetchWithToken(`${API_BASE_URL}/notes/${id}`)
  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return {
      error: true,
      code: response.status,
      data: null,
      message: responseJson.message,
    }
  }

  return {
    error: false,
    code: response.status,
    data: responseJson.data,
    message: responseJson.message,
  }
}

const archiveNote = async (id) => {
  const response = await fetchWithToken(`${API_BASE_URL}/notes/${id}/archive`, {
    method: 'POST',
  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return {
      error: true,
      code: response.status,
      data: null,
      message: responseJson.message,
    }
  }

  return {
    error: false,
    code: response.status,
    data: responseJson.data,
    message: responseJson.message,
  }
}

const unarchiveNote = async (id) => {
  const response = await fetchWithToken(
    `${API_BASE_URL}/notes/${id}/unarchive`,
    {
      method: 'POST',
    }
  )

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return {
      error: true,
      code: response.status,
      data: null,
      message: responseJson.message,
    }
  }

  return {
    error: false,
    code: response.status,
    data: responseJson.data,
    message: responseJson.message,
  }
}

const toggleArchiveNote = async (id, isArchive) => {
  if (isArchive) {
    const res = await unarchiveNote(id)
    return res
  }
  const res = await archiveNote(id)
  return res
}

const deleteNote = async (id) => {
  const response = await fetchWithToken(`${API_BASE_URL}/notes/${id}`, {
    method: 'DELETE',
  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return {
      error: true,
      code: response.status,
      data: null,
      message: responseJson.message,
    }
  }

  return {
    error: false,
    code: response.status,
    data: responseJson.data,
    message: responseJson.message,
  }
}

export {
  getAccessToken,
  putAccessToken,
  removeAccessToken,
  login,
  register,
  getUserLogged,
  addNote,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  archiveNote,
  unarchiveNote,
  toggleArchiveNote,
  deleteNote,
}
