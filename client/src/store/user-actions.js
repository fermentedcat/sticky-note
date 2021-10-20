import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../App'

export const authenticateUser = createAsyncThunk(
  'user/authenticateUser',
  async (username = '', { rejectWithValue }) => {
    try {
      const response = await api.callGet(`user/auth/`)
      return response.data
    } catch (err) {
      return rejectWithValue([], err)
    }
  }
)

export const searchUsers = createAsyncThunk(
  'user/searchUsers',
  async (username = '', { rejectWithValue }) => {
    try {
      const response = await api.callGet(`user/search/${username}`)
      return response.data
    } catch (err) {
      return rejectWithValue([], err)
    }
  }
)

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (username, { rejectWithValue }) => {
    try {
      const response = await api.callGet(`user/${username}`)
      return response.data
    } catch (err) {
      return rejectWithValue([], err)
    }
  }
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.callPost(data, 'user/login')
      return response.data
    } catch (err) {
      return rejectWithValue([], err)
    }
  }
)

export const addUser = createAsyncThunk(
  'user/addUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.callPost(data, 'user')
      return response.data
    } catch (err) {
      return rejectWithValue([], err)
    }
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.callPost(data, `user/${data._id}`)
      return response.data
    } catch (err) {
      return rejectWithValue([], err)
    }
  }
)

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.callDelete(`user/${id}`)
      return response.data
    } catch (err) {
      return rejectWithValue([], err)
    }
  }
)
