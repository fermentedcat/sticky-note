import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../App'

export const fetchStacks = createAsyncThunk(
  'stack/fetchStacks',
  async (endpoint = '', { rejectWithValue }) => {
    try {
      const response = await api.callGet(`stack/${endpoint}`)
      return response.data
    } catch (err) {
      return rejectWithValue([], err)
    }
  }
)

export const addStack = createAsyncThunk(
  'stack/addStack',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.callPost(data, 'stack')
      return response.data
    } catch (err) {
      return rejectWithValue([], err)
    }
  }
)

export const updateStack = createAsyncThunk(
  'stack/updateStack',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.callPost(data, `stack/${data._id}`)
      return response.data
    } catch (err) {
      return rejectWithValue([], err)
    }
  }
)

export const deleteStack = createAsyncThunk(
  'stack/deleteStack',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.callDelete(`stack/${id}`)
      return response.data
    } catch (err) {
      return rejectWithValue([], err)
    }
  }
)
