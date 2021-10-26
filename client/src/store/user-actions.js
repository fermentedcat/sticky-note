import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../App'
import { uiActions } from './ui-slice'

export const authenticateUser = createAsyncThunk(
  'user/authenticateUser',
  async (username = '', { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callGet(`user/auth/`)
      dispatch(
        uiActions.setNotification({
          type: 'success',
          message: 'You are logged in.',
        })
      )
      return response.data
    } catch (err) {
      return rejectWithValue([], err)
    }
  }
)

export const searchUsers = createAsyncThunk(
  'user/searchUsers',
  async (username = '', { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callGet(`user/search/${username}`)
      return response.data
    } catch (err) {
      dispatch(
        uiActions.setNotification({
          type: 'error',
          message: 'Failed fetching user data.',
        })
      )
      return rejectWithValue([], err)
    }
  }
)

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (endpoint, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callGet(`user/${endpoint}`)
      return response.data
    } catch (err) {
      dispatch(
        uiActions.setNotification({
          type: 'error',
          message: 'Failed fetching user data.',
        })
      )
      return rejectWithValue([], err)
    }
  }
)

export const fetchPinned = createAsyncThunk(
  'user/fetchPinned',
  async (endpoint = '', { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callGet(`user/pinned/${endpoint}`)
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

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callPost(data, 'user/login')
      dispatch(
        uiActions.setNotification({
          type: 'success',
          message: 'Successfully logged in.',
        })
      )
      return response.data
    } catch (err) {
      dispatch(
        uiActions.setNotification({
          type: 'error',
          message: 'Login failed.',
        })
      )
      return rejectWithValue([], err)
    }
  }
)

export const addUser = createAsyncThunk(
  'user/addUser',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callPost(data, 'user')
      dispatch(
        uiActions.setNotification({
          type: 'success',
          message: 'Successfully registered.',
        })
      )
      return response.data
    } catch (err) {
      dispatch(
        uiActions.setNotification({
          type: 'error',
          message: 'Registration failed.',
        })
      )
      return rejectWithValue([], err)
    }
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callPost(data, `user/${data._id}`)
      dispatch(
        uiActions.setNotification({
          type: 'success',
          message: 'Successfully updated.',
        })
      )
      return response.data
    } catch (err) {
      dispatch(
        uiActions.setNotification({
          type: 'error',
          message: 'Update failed.',
        })
      )
      return rejectWithValue([], err)
    }
  }
)

export const addPin = createAsyncThunk(
  'user/addPin',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callPost(data, `user/addPin`)
      dispatch(
        uiActions.setNotification({
          type: 'Success',
          message: 'Todo list pinned.',
        })
      )
      return response.data
    } catch (err) {
      dispatch(
        uiActions.setNotification({
          type: 'error',
          message: 'Failed adding pin.',
        })
      )
      return rejectWithValue([], err)
    }
  }
)

export const removePin = createAsyncThunk(
  'user/removePin',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callPost(data, `user/removePin`)
      dispatch(
        uiActions.setNotification({
          type: 'success',
          message: 'Todo list unpinned.',
        })
      )
      return response.data
    } catch (err) {
      dispatch(
        uiActions.setNotification({
          type: 'error',
          message: 'Failed removing pin.',
        })
      )
      return rejectWithValue([], err)
    }
  }
)

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callDelete(`user/${id}`)
      dispatch(
        uiActions.setNotification({
          type: 'success',
          message: 'Account deleted successfully.',
        })
      )
      return response.data
    } catch (err) {
      dispatch(
        uiActions.setNotification({
          type: 'error',
          message: 'Failed deleting account.',
        })
      )
      return rejectWithValue([], err)
    }
  }
)
