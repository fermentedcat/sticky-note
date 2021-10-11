import { API_URL } from '../config'

export const getUserData = async (userId) => {
  const response = await fetch(`${API_URL}/user/${userId}`)
  if (!response.ok) {
    throw response
  }
  return response
}

export const addNewUser = async (userData) => {
  const res = await fetch(`${API_URL}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  const response = await res.json()
  if (!response.ok) {
    throw response
  }
  return response
}

export const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/user/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  if (!response.ok) {
    throw response
  }
  return response
}

