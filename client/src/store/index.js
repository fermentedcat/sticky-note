import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth-slice'
import stackReducer from './stack-slice'
import todoReducer from './todo-slice'

const reducer = {
  auth: authReducer,
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