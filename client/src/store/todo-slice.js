import { createSlice } from '@reduxjs/toolkit'
import { fetchTodos, addTodo, updateTodo, deleteTodo } from './todo-actions'

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
      state.stack = action.payload.stack
      state.todos = action.payload.todos
    },
    clearTodos(state) {
      return initialTodoSlice
    },
  },
  extraReducers: {
    [fetchTodos.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        const { stack, todos } = payload
        state.todos = todos
        state.stack = stack
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
        state.currentRequestId = ''
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
        state.currentRequestId = ''
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
