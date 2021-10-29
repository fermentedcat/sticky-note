import { createSlice } from '@reduxjs/toolkit'
import {
  fetchStacks,
  addStack,
  updateStack,
  deleteStack,
} from './stack-actions'

// Handles stacks in sidebar
const initialStackSlice = {
  stacks: null,
  loading: false,
  currentRequestId: '',
  error: null,
}

const stackSlice = createSlice({
  name: 'stack',
  initialState: initialStackSlice,
  reducers: {
    setStacks(state, action) {
      state.stacks = action.payload
    },
    clearStacks(state) {
      return initialStackSlice
    },
  },
  extraReducers: {
    [fetchStacks.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.stacks = payload
        state.loading = false
        state.currentRequestId = meta
      }
    },
    [fetchStacks.pending]: (state, { meta }) => {
      state.currentRequestId = meta
      state.loading = true
    },
    [fetchStacks.rejected]: (state, { meta, payload, error }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentRequestId = meta
        state.loading = false
        state.error = error.message
      }
    },

    [addStack.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.stacks.push(payload)
        state.loading = false
        state.currentRequestId = meta
      }
    },
    [addStack.pending]: (state, { meta }) => {
      state.currentRequestId = meta
      state.loading = true
    },
    [addStack.rejected]: (state, { meta, payload, error }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentRequestId = meta
        state.loading = false
        state.error = error.message
      }
    },

    [updateStack.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        const index = state.stacks.findIndex(
          (stack) => stack._id === payload._id
        )
        state.stacks[index] = payload
        state.loading = false
        state.currentRequestId = meta
      }
    },
    [updateStack.pending]: (state, { meta }) => {
      state.currentRequestId = meta
      state.loading = true
    },
    [updateStack.rejected]: (state, { meta, payload, error }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentRequestId = meta
        state.loading = false
        state.error = error.message
      }
    },

    [deleteStack.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        const stackId = meta.arg
        state.stacks = state.stacks.filter((stack) => stack._id !== stackId)
        state.loading = false
        state.currentRequestId = meta
      }
    },
    [deleteStack.pending]: (state, { meta }) => {
      state.currentRequestId = meta
      state.loading = true
    },
    [deleteStack.rejected]: (state, { meta, payload, error }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentRequestId = meta
        state.loading = false
        state.error = error.message
      }
    },
  },
})

export default stackSlice.reducer
export const stackActions = stackSlice.actions
