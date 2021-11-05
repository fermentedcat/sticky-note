import { createSlice } from '@reduxjs/toolkit'
import { fetchTodos, addTodo, updateTodo, deleteTodo } from './todo-actions'

// Handles currently displaying todos (and stack)
const initialTodoSlice = {
  stack: null,
  todos: null,
  loading: false,
  currentRequestId: '',
  error: null,
}

const todoSlice = createSlice({
  name: 'todo',
  initialState: initialTodoSlice,
  reducers: {
    setTodos(state, action) {
      state.stack = action.payload.stack || null
      state.todos = action.payload.todos || action.payload
      state.requestId = ''
    },
    setStack(state, action) {
      state.stack = action.payload
    },
    clearTodos(state) {
      return initialTodoSlice
    },
  },
  extraReducers: {
    [fetchTodos.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.todos = payload.todos || payload
        state.stack = payload.stack || state.stack
        state.loading = false
        state.currentRequestId = meta
      }
    },
    [fetchTodos.pending]: (state, { meta }) => {
      state.currentRequestId = meta
      state.loading = true
    },
    [fetchTodos.rejected]: (state, { meta, payload, error }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentRequestId = meta
        state.loading = false
        state.error = error.message
      }
    },

    [addTodo.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.todos.push(payload)
        state.loading = false
        state.currentRequestId = ''
      }
    },
    [addTodo.pending]: (state, { meta }) => {
      state.currentRequestId = meta
      state.loading = true
    },
    [addTodo.rejected]: (state, { meta, payload, error }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentRequestId = meta
        state.loading = false
        state.error = error.message
      }
    },

    [updateTodo.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        const index = state.todos.findIndex((todo) => todo._id === payload._id)
        state.todos[index] = payload
        state.loading = false
        state.currentRequestId = meta
      }
    },
    [updateTodo.pending]: (state, { meta }) => {
      state.currentRequestId = meta
      state.loading = true
    },
    [updateTodo.rejected]: (state, { meta, payload, error }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentRequestId = meta
        state.loading = false
        state.error = error.message
      }
    },

    [deleteTodo.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.todos = state.todos.filter((todo) => todo._id !== payload)
        state.loading = false
        state.currentRequestId = meta
      }
    },
    [deleteTodo.pending]: (state, { meta }) => {
      state.currentRequestId = meta
      state.loading = true
    },
    [deleteTodo.rejected]: (state, { meta, payload, error }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentRequestId = meta
        state.loading = false
        state.error = error.message
      }
    },
  },
})

export default todoSlice.reducer
export const todoActions = todoSlice.actions
