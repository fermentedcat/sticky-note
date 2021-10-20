import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user-slice'
import stackReducer from './stack-slice'
import todoReducer from './todo-slice'

const reducer = {
  user: userReducer,
  stack: stackReducer,
  todo: todoReducer,
}

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store;