import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'

import {
  authenticateUser,
  loginUser,
  addUser,
  updateUser,
  addPin,
  removePin,
  deleteUser,
} from './user-actions'

// Handles logged in user data
const initialUserSlice = {
  isAuthenticated: false,
  fullName: '',
  username: '',
  email: '',
  createdAt: '',
  userId: '',
  pinnedTodos: [],
  userSearch: [],
  currentRequestId: '',
  loadingAuth: false,
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
    setUser(state, action) {
      const { fullName, username, email, pinnedTodos, createdAt } =
        action.payload
      state.fullName = fullName
      state.username = username
      state.createdAt = createdAt
      state.email = email
      state.pinnedTodos = pinnedTodos
    },
  },
  extraReducers: {
    [authenticateUser.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        const { username, userId } = payload
        state.isAuthenticated = true
        state.username = username
        state.userId = userId
        state.loadingAuth = false
        state.loading = false
        state.currentRequestId = meta
      }
    },
    [authenticateUser.pending]: (state, { meta }) => {
      state.currentRequestId = meta
      state.loadingAuth = true
      state.loading = true
    },
    [authenticateUser.rejected]: (state, { meta, payload, error }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentRequestId = meta
        state.loadingAuth = false
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
        const { user, token } = payload
        window.localStorage.setItem('TODO_TOKEN', token)
        state.fullName = user.fullName
        state.username = user.username
        state.email = user.email
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

    [addPin.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        const todoId = payload
        state.pinnedTodos.push(todoId)
        state.loading = false
        state.currentRequestId = meta
      }
    },
    [addPin.pending]: (state, { meta }) => {
      state.currentRequestId = meta
      state.loading = true
    },
    [addPin.rejected]: (state, { meta, payload, error }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentRequestId = meta
        state.loading = false
        state.error = error.message
      }
    },

    [removePin.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        const todoId = payload
        state.pinnedTodos = state.pinnedTodos.filter((i) => i !== todoId)
        state.loading = false
        state.currentRequestId = meta
      }
    },
    [removePin.pending]: (state, { meta }) => {
      state.currentRequestId = meta
      state.loading = true
    },
    [removePin.rejected]: (state, { meta, payload, error }) => {
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
