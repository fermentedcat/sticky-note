import jwtDecode from 'jwt-decode'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export default class Api {
  constructor() {
    this.apiURL = API_URL
  }

  callGet = (endpoint) =>
    axios({
      url: `${this.apiURL}${endpoint}`,
      headers: { 'x-auth-token': this.getToken() },
    })

  callPost = (data, endpoint) =>
    axios({
      url: `${this.apiURL}${endpoint}`,
      method: 'POST',
      headers: {
        'x-auth-token': this.getToken(),
      },
      data: data,
    })

  callDelete = (endpoint) =>
    axios({
      url: `${this.apiURL}${endpoint}`,
      method: 'DELETE',
      headers: {
        'x-auth-token': this.getToken(),
      },
    })

  isValidToken() {
    const { exp } = jwtDecode(this.getToken())
    const expirationTime = exp * 1000 - 60000
    return Date.now() >= expirationTime
  }

  getToken() {
    return window.localStorage.getItem('TODO_TOKEN')
  }
}
