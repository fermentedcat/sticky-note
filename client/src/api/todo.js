import { API_URL } from '../config'

export const getTodoData = async (todoId) => {
  const response = await fetch(`${API_URL}/todo/${todoId}`)
  if (!response.ok) {
    throw new Error('Error fetching todo data.')
  }
  return await response.json()
}