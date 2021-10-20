import { createAsyncThunk } from '@reduxjs/toolkit'
import Api from '../api/api'

export const api = new Api()

export const fetchTodos = createAsyncThunk(
  'todo/fetchTodos',
  async (endpoint = '', { rejectWithValue }) => {
    try {
      const response = await api.callGet(endpoint)
      return response.data
    } catch (err) {
      return rejectWithValue([], err)
    }
  }
)

export const addTodo = createAsyncThunk(
  'todo/addTodo',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.callPost(data, 'todo')
      return response.data
    } catch (err) {
      return rejectWithValue([], err)
    }
  }
)

export const updateTodo = createAsyncThunk(
  'todo/updateTodo',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.callPost(data, `todo/${data._id}`)
      return response.data
    } catch (err) {
      return rejectWithValue([], err)
    }
  }
)

export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.callDelete(`todo/${id}`)
      return response.data
    } catch (err) {
      return rejectWithValue([], err)
    }
  }
)
