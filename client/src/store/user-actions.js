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
  async (endpoint, { rejectWithValue }) => {
    try {
      const response = await api.callGet(`user/${endpoint}`)
      return response.data
    } catch (err) {
      return rejectWithValue([], err)
    }
  }
)

export const fetchPinned = createAsyncThunk(
  'user/fetchPinned',
  async (endpoint = '', { rejectWithValue }) => {
    try {
      const response = await api.callGet(`user/pinned/${endpoint}`)
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

export const addPin = createAsyncThunk(
  'user/addPin',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.callPost(data, `user/addPin`)
      return response.data
    } catch (err) {
      return rejectWithValue([], err)
    }
  }
)

export const removePin = createAsyncThunk(
  'user/removePin',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.callPost(data, `user/removePin`)
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
