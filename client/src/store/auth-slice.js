import { createSlice } from "@reduxjs/toolkit"

const initialAuthSlice = {
  isAuthenticated: false,
  userId: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthSlice,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true
    },
    logout(state, action) {
      state.isAuthenticated = false
    },
  },
  extraReducers: {}
})

export default authSlice.reducer
export const authActions = authSlice.actions