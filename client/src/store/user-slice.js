import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'

import {
  authenticateUser,
  loginUser,
  fetchUser,
  addUser,
  updateUser,
  deleteUser,
} from './user-actions'

const initialUserSlice = {
  isAuthenticated: false,
  fullName: '',
  username: '',
  email: '',
  userId: '',
  // pinnedTodos: [],
  userSearch: [],
  currentRequestId: '',
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserSlice,
  reducers: {
    logout(state) {
      return initialUserSlice
    },
  },
  extraReducers: {
    [authenticateUser.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        const { username, userId } = payload
        state.isAuthenticated = true
        state.username = username
        state.userId = userId
        state.loading = false
        state.currentRequestId = meta
      }
    },
    [authenticateUser.pending]: (state, { meta }) => {
      state.currentRequestId = meta
      state.loading = true
    },
    [authenticateUser.rejected]: (state, { meta, payload, error }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentRequestId = meta
        state.loading = false
        state.error = error.message
      }
    },

    [loginUser.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        window.localStorage.setItem('TODO_TOKEN', payload)
        const decoded = jwtDecode(payload)
        state.userId = decoded.userId || ''
        state.isAuthenticated = true
        state.username = decoded.username
        state.loading = false
        state.currentRequestId = meta
      }
    },
    [loginUser.pending]: (state, { meta }) => {
      state.currentRequestId = meta
      state.loading = true
    },
    [loginUser.rejected]: (state, { meta, payload, error }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentRequestId = meta
        state.loading = false
        state.error = error.message
      }
    },

    [fetchUser.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        const { fullName, username, email } = payload
        state.fullName = fullName
        state.username = username
        state.email = email
        state.loading = false
        state.currentRequestId = meta
      }
    },
    [fetchUser.pending]: (state, { meta }) => {
      state.currentRequestId = meta
      state.loading = true
    },
    [fetchUser.rejected]: (state, { meta, payload, error }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentRequestId = meta
        state.loading = false
        state.error = error.message
      }
    },

    [addUser.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        window.localStorage.setItem('TODO_TOKEN', payload)
        const decoded = jwtDecode(payload)
        const username = decoded.username || 'buddy'
        state.isAuthenticated = true
        state.username = username
        state.loading = false
        state.currentRequestId = meta
      }
    },
    [addUser.pending]: (state, { meta }) => {
      state.currentRequestId = meta
      state.loading = true
    },
    [addUser.rejected]: (state, { meta, payload, error }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentRequestId = meta
        state.loading = false
        state.error = error.message
      }
    },

    [updateUser.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        const { fullName, username, email } = payload
        state.fullName = fullName
        state.username = username
        state.email = email
        state.loading = false
        state.currentRequestId = meta
      }
    },
    [updateUser.pending]: (state, { meta }) => {
      state.currentRequestId = meta
      state.loading = true
    },
    [updateUser.rejected]: (state, { meta, payload, error }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentRequestId = meta
        state.loading = false
        state.error = error.message
      }
    },

    [deleteUser.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        return initialUserSlice
      }
    },
    [deleteUser.pending]: (state, { meta }) => {
      state.currentRequestId = meta
      state.loading = true
    },
    [deleteUser.rejected]: (state, { meta, payload, error }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentRequestId = meta
        state.loading = false
        state.error = error.message
      }
    },
  },
})

export default userSlice.reducer
export const userActions = userSlice.actions
