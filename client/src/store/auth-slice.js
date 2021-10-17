import { createSlice } from "@reduxjs/toolkit"
import jwtDecode from 'jwt-decode'
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL


const initialAuthSlice = {
  isAuthenticated: false,
  token: null,
  username: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthSlice,
  reducers: {
    login(state, action) {
      const decoded = jwtDecode(action.payload)
      const username = decoded.username || 'buddy'
      state.isAuthenticated = true
      state.token = action.payload
      state.username = username
    },
    logout(state) {
      state.isAuthenticated = initialAuthSlice.isAuthenticated
      state.token = initialAuthSlice.token
      state.username = initialAuthSlice.username
    },
  },
  extraReducers: {}
})

export default authSlice.reducer
export const authActions = authSlice.actions

export const authenticate = () => {
  return async dispatch => {
    const token = window.localStorage.getItem('TODO_TOKEN')
    try {
      await axios({ 
        url: `${API_URL}user/auth`, 
        headers: { 
          'x-auth-token': token
        } 
      });
      dispatch(authActions.login(token))
    } catch (error) {
      console.log(error)
    }
  }
}

export const isValidToken = () => {
  const { exp } = jwtDecode(authSlice.token)
  const expirationTime = (exp * 1000) - 60000
  return Date.now() >= expirationTime
}