import axios from 'axios'
const API_URL = 'http://localhost:3001/api/v1/user/'

const userAccess = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  return axios.post(API_URL + 'profile')
}
const updateUser = (firstName, lastName, token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  return axios.put(API_URL + 'profile', {
    firstName,
    lastName,
  })
}

const userService = {
  userAccess,
  updateUser,
}
export default userService
