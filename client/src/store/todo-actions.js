import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../App'
import { handleSuccessMsg, handleErrorMsg } from './ui-actions'

export const fetchTodos = createAsyncThunk(
  'todo/fetchTodos',
  async (endpoint = 'todo', { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callGet(endpoint)
      return response.data
    } catch (err) {
      handleErrorMsg(err, dispatch, 'Failed fetching data.')
      return rejectWithValue([], err)
    }
  }
)

export const addTodo = createAsyncThunk(
  'todo/addTodo',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callPost(data, 'todo')
      handleSuccessMsg(dispatch, 'New todo created.')
      return response.data
    } catch (err) {
      handleErrorMsg(err, dispatch, 'Failed saving todo.')
      return rejectWithValue([], err)
    }
  }
)

export const updateTodo = createAsyncThunk(
  'todo/updateTodo',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callPost(data, `todo/${data._id}`)
      handleSuccessMsg(dispatch, 'Todo updated.')
      return response.data
    } catch (err) {
      handleErrorMsg(err, dispatch, 'Failed updating todo.')
      return rejectWithValue([], err)
    }
  }
)

export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callDelete(`todo/${id}`)
      handleSuccessMsg(dispatch, 'Todo list deleted.')
      return response.data
    } catch (err) {
      handleErrorMsg(err, dispatch, 'Failed deleting todo.')
      return rejectWithValue([], err)
    }
  }
)
