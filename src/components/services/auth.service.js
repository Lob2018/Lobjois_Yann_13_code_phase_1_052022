import authHeader from './auth-header'
import axios from 'axios'
const API_URL = 'http://localhost:3001/api/v1/user/'

const signup = (email, password, firstName, lastName) => {
  return axios.post(
    API_URL + 'signup',
    { headers: authHeader() },
    {
      email,
      password,
      firstName,
      lastName,
    }
  )
}
const login = (email, password, rememberMe) => {
  return axios
    .post(API_URL + 'login', {
      email,
      password,
    })
    .then((response) => {
      const token = response.data.body.token
      logout()
      if (token) {
        if (rememberMe) {
          localStorage.setItem('argentbank-user', JSON.stringify(token))
        } else {
          sessionStorage.setItem('argentbank-user', JSON.stringify(token))
        }
      }
      return response.data
    })
}
const logout = () => {
  if (localStorage.getItem('argentbank-user'))
    localStorage.removeItem('argentbank-user')
  if (sessionStorage.getItem('argentbank-user'))
    sessionStorage.removeItem('argentbank-user')
}
export default {
  signup,
  login,
  logout,
}
