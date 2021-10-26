import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../App'
import { uiActions } from './ui-slice'

export const fetchTodos = createAsyncThunk(
  'todo/fetchTodos',
  async (endpoint = 'todo', { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callGet(endpoint)
      return response.data
    } catch (err) {
      dispatch(
        uiActions.setNotification({
          type: 'error',
          message: 'Failed fetching data.',
        })
      )
      return rejectWithValue([], err)
    }
  }
)

export const addTodo = createAsyncThunk(
  'todo/addTodo',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callPost(data, 'todo')
      dispatch(
        uiActions.setNotification({
          type: 'success',
          message: 'New todo created.',
        })
      )
      return response.data
    } catch (err) {
      dispatch(
        uiActions.setNotification({
          type: 'error',
          message: 'Failed saving todo.',
        })
      )
      return rejectWithValue([], err)
    }
  }
)

export const updateTodo = createAsyncThunk(
  'todo/updateTodo',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callPost(data, `todo/${data._id}`)
      dispatch(
        uiActions.setNotification({
          type: 'success',
          message: 'Todo updated.',
        })
      )
      return response.data
    } catch (err) {
      dispatch(
        uiActions.setNotification({
          type: 'error',
          message: 'Failed updating todo.',
        })
      )
      return rejectWithValue([], err)
    }
  }
)

export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callDelete(`todo/${id}`)
      dispatch(
        uiActions.setNotification({
          type: 'success',
          message: 'Todo list deleted.',
        })
      )
      return response.data
    } catch (err) {
      dispatch(
        uiActions.setNotification({
          type: 'error',
          message: 'Failed deleting todo.',
        })
      )
      return rejectWithValue([], err)
    }
  }
)
