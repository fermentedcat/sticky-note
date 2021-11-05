import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../App'
import { todoActions } from './todo-slice'
import { handleSuccessMsg, handleErrorMsg } from './ui-actions'

export const fetchStacks = createAsyncThunk(
  'stack/fetchStacks',
  async (endpoint = '', { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callGet(`stack/${endpoint}`)
      return response.data
    } catch (err) {
      handleErrorMsg(err, dispatch, 'Failed fetching data.')
      return rejectWithValue([], err)
    }
  }
)

export const addStack = createAsyncThunk(
  'stack/addStack',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callPost(data, 'stack')
      handleSuccessMsg(dispatch, 'Stack created.')
      return response.data
    } catch (err) {
      handleErrorMsg(err, dispatch, 'Failed saving stack.')
      return rejectWithValue([], err)
    }
  }
)

export const updateStack = createAsyncThunk(
  'stack/updateStack',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callPost(data, `stack/${data._id}`)
      handleSuccessMsg(dispatch, 'Stack updated successfully.')
      dispatch(todoActions.setStack(response.data))
      return response.data
    } catch (err) {
      handleErrorMsg(err, dispatch, 'Failed updating stack.')
      return rejectWithValue([], err)
    }
  }
)

export const addStackAccess = createAsyncThunk(
  'stack/addStackAccess',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callPost(data, 'access')
      handleSuccessMsg(dispatch, 'Stack access added successfully.')
      return response.data
    } catch (err) {
      handleErrorMsg(err, dispatch, err.response.data.errorMessage)
      return rejectWithValue([], err)
    }
  }
)

export const deleteStack = createAsyncThunk(
  'stack/deleteStack',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.callDelete(`stack/${id}`)
      handleSuccessMsg(dispatch, 'Stack deleted successfully.')
      return response.data
    } catch (err) {
      handleErrorMsg(err, dispatch, 'Failed deleting stack.')
      return rejectWithValue([], err)
    }
  }
)
