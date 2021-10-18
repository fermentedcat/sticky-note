import { useReducer, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL

const initialState = {
  data: null,
  error: null,
  token: ''
};

const stateReducer = (state, action) => {
  if (action.type === 'DATA') {
    return { data: action.data, error: null };
  }
  if (action.type === 'ERROR') {
    return { data: state.data, error: action.error };
  }
  if (action.type === 'TOKEN') {
    return { token: action.token, error: state.error };
  }
  if (action.type === 'SET_DATA') {
    return { data: action.data, error: state.error };
  }

  return stateReducer;
};

const useApi = (initialEndpoint) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const getToken = () => {
    const token = window.localStorage.getItem('TODO_TOKEN')
    dispatch({ type: 'TOKEN', token: token})
    return token
  }

  const callGet = async (endpoint) => {
    try {
      const response = await axios({ 
        url: `${API_URL}${endpoint}`, 
        headers: { 
          'x-auth-token': state.token || getToken() 
        } 
      });
      dispatch({ type: 'DATA', data: response.data})
    } catch (error) {
      dispatch({ type: 'ERROR', error: 'Failed to get data.' }); //? ändra error
    }
  };

  const callPost = async (data, endpoint) => {
    try {
      const response = await axios({ 
        url: `${API_URL}${endpoint}`, 
        method: 'POST', 
        headers: { 
          'x-auth-token': state.token || getToken() 
        }, 
        data: data 
      });
      dispatch({ type: 'DATA', data: response.data})
    } catch (error) {
      dispatch({ type: 'ERROR', error: 'Failed to send data.' }); //? ändra error
    }
  };

  const callDelete = (endpoint) => {
    try {
      const response = axios({ 
        url: `${API_URL}${endpoint}`, 
        method: 'DELETE', 
        headers: { 
          'x-auth-token': state.token || getToken() 
        } });
      dispatch({ type: 'DATA', data: response.data})
    } catch (error) {
      dispatch({ type: 'ERROR', error: 'Failed to delete.' }); //? ändra error
    }
  };

  const setData = (data) => {
    dispatch({ type: 'SET_DATA', data: data });
  }

  useEffect(() => {
    getToken()
  }, [])

  useEffect(() => {
    if (initialEndpoint) callGet(initialEndpoint)
  }, [initialEndpoint])


  return {
    data: state.data,
    error: state.error,
    token: state.token,
    callGet,
    callPost,
    callDelete,
    setData
  };
};

export default useApi;
