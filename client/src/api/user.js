import { API_URL } from '../config'

export const getUserData = async (userId) => {
  const response = await fetch(`${API_URL}/user/${userId}`)
  const data = await response.json()
  if (!response.ok) {
    throw data
  }
  return data
}

export const addNewUser = async (userData) => {
  const response = await fetch(`${API_URL}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  const data = await response.json()
  if (!response.ok) {
    throw data
  }
  return data
}

export const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/user/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  const data = await response.json()
  if (!response.ok) {
    throw data
  }
  return data
}

