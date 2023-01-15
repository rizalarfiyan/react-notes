import { API_BASE_URL, STORAGE_KEY } from '../constants'

function getAccessToken() {
  return localStorage.getItem(STORAGE_KEY.accessToken)
}

function putAccessToken(accessToken) {
  return localStorage.setItem(STORAGE_KEY.accessToken, accessToken)
}

function removeAccessToken() {
  return localStorage.removeItem(STORAGE_KEY.accessToken)
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  })
}

async function login({ email, password }) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return { error: true, data: null, message: responseJson.message }
  }

  return {
    error: false,
    data: responseJson.data,
    message: responseJson.message,
  }
}

async function register({ name, email, password }) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return { error: true, message: responseJson.message }
  }

  return { error: false, message: responseJson.message }
}

async function getUserLogged() {
  const response = await fetchWithToken(`${API_BASE_URL}/users/me`)
  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return { error: true, data: null, message: responseJson.message }
  }

  return {
    error: false,
    data: responseJson.data,
    message: responseJson.message,
  }
}

async function addNote({ title, body }) {
  const response = await fetchWithToken(`${API_BASE_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body }),
  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return { error: true, data: null, message: responseJson.message }
  }

  return {
    error: false,
    data: responseJson.data,
    message: responseJson.message,
  }
}

async function getActiveNotes() {
  const response = await fetchWithToken(`${API_BASE_URL}/notes`)
  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return { error: true, data: null, message: responseJson.message }
  }

  return {
    error: false,
    data: responseJson.data,
    message: responseJson.message,
  }
}

async function getArchivedNotes() {
  const response = await fetchWithToken(`${API_BASE_URL}/notes/archived`)
  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return { error: true, data: null, message: responseJson.message }
  }

  return {
    error: false,
    data: responseJson.data,
    message: responseJson.message,
  }
}

async function getNote(id) {
  const response = await fetchWithToken(`${API_BASE_URL}/notes/${id}`)
  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return { error: true, data: null, message: responseJson.message }
  }

  return {
    error: false,
    data: responseJson.data,
    message: responseJson.message,
  }
}

async function archiveNote(id) {
  const response = await fetchWithToken(`${API_BASE_URL}/notes/${id}/archive`, {
    method: 'POST',
  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return { error: true, data: null, message: responseJson.message }
  }

  return {
    error: false,
    data: responseJson.data,
    message: responseJson.message,
  }
}

async function unarchiveNote(id) {
  const response = await fetchWithToken(
    `${API_BASE_URL}/notes/${id}/unarchive`,
    {
      method: 'POST',
    }
  )

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return { error: true, data: null, message: responseJson.message }
  }

  return {
    error: false,
    data: responseJson.data,
    message: responseJson.message,
  }
}

async function deleteNote(id) {
  const response = await fetchWithToken(`${API_BASE_URL}/notes/${id}`, {
    method: 'DELETE',
  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return { error: true, data: null, message: responseJson.message }
  }

  return {
    error: false,
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
  deleteNote,
}
