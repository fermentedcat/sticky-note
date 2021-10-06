import { API_URL } from '../config'

export const getUserData = async (userId) => {
  const response = await fetch(`${API_URL}/user/${userId}`)
  if (!response.ok) {
    throw new Error('Error fetching user data.')
  }
  return await response.json()
}