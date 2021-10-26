import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../App'
import { uiActions } from './ui-slice'

export const fetchStacks = createAsyncThunk(
  'stack/fetchStacks',
  async (endpoint = '', { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callGet(`stack/${endpoint}`)
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

export const addStack = createAsyncThunk(
  'stack/addStack',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callPost(data, 'stack')
      dispatch(
        uiActions.setNotification({
          type: 'success',
          message: 'Stack created.',
        })
      )
      return response.data
    } catch (err) {
      dispatch(
        uiActions.setNotification({
          type: 'error',
          message: 'Failed saving stack.',
        })
      )
      return rejectWithValue([], err)
    }
  }
)

export const updateStack = createAsyncThunk(
  'stack/updateStack',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callPost(data, `stack/${data._id}`)
      dispatch(
        uiActions.setNotification({
          type: 'success',
          message: 'Stack updated successfully.',
        })
      )
      return response.data
    } catch (err) {
      dispatch(
        uiActions.setNotification({
          type: 'error',
          message: 'Failed updating stack.',
        })
      )
      return rejectWithValue([], err)
    }
  }
)

export const deleteStack = createAsyncThunk(
  'stack/deleteStack',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callDelete(`stack/${id}`)
      dispatch(
        uiActions.setNotification({
          type: 'success',
          message: 'Stack deleted successfully.',
        })
      )
      return response.data
    } catch (err) {
      dispatch(
        uiActions.setNotification({
          type: 'error',
          message: 'Failed deleting stack.',
        })
      )
      return rejectWithValue([], err)
    }
  }
)
