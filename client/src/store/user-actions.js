import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../App'
import { userActions } from './user-slice'
import { handleSuccessMsg, handleErrorMsg } from './ui-actions'
import { uiActions } from './ui-slice'

export const authenticateUser = createAsyncThunk(
  'user/authenticateUser',
  async (token = '', { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callGet(`user/auth/`)
      handleSuccessMsg(dispatch, 'You are logged in.')
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
      handleErrorMsg(err, dispatch, 'Failed fetching user data.')
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
      handleErrorMsg(err, dispatch, 'Failed fetching user data.')
      return rejectWithValue([], err)
    }
  }
)

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async (endpoint, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callGet(`user/me`)
      dispatch(userActions.setUser(response.data))
      return response.data
    } catch (err) {
      handleErrorMsg(err, dispatch, 'Failed fetching user data.')
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
      handleErrorMsg(err, dispatch, 'Failed fetching data.')
      return rejectWithValue([], err)
    }
  }
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callPost(data, 'user/login')
      handleSuccessMsg(dispatch, 'Successfully logged in.')
      return response.data
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(
          uiActions.setNotification({
            type: 'error',
            message: 'Incorrect email/username or password.',
          })
        )
      } else {
        handleErrorMsg(err, dispatch, 'Login failed.')
      }
      return rejectWithValue([], err)
    }
  }
)

export const addUser = createAsyncThunk(
  'user/addUser',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callPost(data, 'user')
      handleSuccessMsg(dispatch, 'Successfully registered.')
      return response.data
    } catch (err) {
      handleErrorMsg(err, dispatch, 'Registration failed.')
      return rejectWithValue([], err)
    }
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callPost(data, `user/${data._id}`)
      handleSuccessMsg(dispatch, 'Successfully updated.')
      return response.data
    } catch (err) {
      handleErrorMsg(err, dispatch, 'Update failed.')
      return rejectWithValue([], err)
    }
  }
)

export const addPin = createAsyncThunk(
  'user/addPin',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      await api.callPost(data, `user/addPin`)
      handleSuccessMsg(dispatch, 'Todo list pinned.')
      return data.todoId
    } catch (err) {
      handleErrorMsg(err, dispatch, 'Failed adding pin.')
      return rejectWithValue([], err)
    }
  }
)

export const removePin = createAsyncThunk(
  'user/removePin',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      await api.callPost(data, `user/removePin`)
      handleSuccessMsg(dispatch, 'Todo list unpinned.')
      return data.todoId
    } catch (err) {
      handleErrorMsg(err, dispatch, 'Failed removing pin.')
      return rejectWithValue([], err)
    }
  }
)

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callDelete(`user/${id}`)
      handleSuccessMsg(dispatch, 'Account deleted successfully.')
      return response.data
    } catch (err) {
      handleErrorMsg(err, dispatch, 'Failed deleting account.')
      return rejectWithValue([], err)
    }
  }
)
