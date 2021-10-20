import jwtDecode from 'jwt-decode'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export default class Api {
  constructor() {
    this.apiURL = API_URL
    this.token = window.localStorage.getItem('TODO_TOKEN')
  }

  callGet = (endpoint) =>
    axios({
      url: `${API_URL}${endpoint}`,
      headers: { 'x-auth-token': window.localStorage.getItem('TODO_TOKEN') },
    })

  callPost = (data, endpoint) =>
    axios({
      url: `${API_URL}${endpoint}`,
      method: 'POST',
      headers: {
        'x-auth-token': window.localStorage.getItem('TODO_TOKEN'),
      },
      data: data,
    })

  callDelete = (endpoint) =>
    axios({
      url: `${API_URL}${endpoint}`,
      method: 'DELETE',
      headers: {
        'x-auth-token': window.localStorage.getItem('TODO_TOKEN'),
      },
    })

  isValidToken() {
    const { exp } = jwtDecode(window.localStorage.getItem('TODO_TOKEN'))
    const expirationTime = exp * 1000 - 60000
    return Date.now() >= expirationTime
  }
 
  reset = () => {
    this.token = ""
  }
}
