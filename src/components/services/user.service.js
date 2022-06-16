import axios from 'axios'
import authHeader from './auth-header'
const API_URL = 'http://localhost:3001/api/v1/user/'

const userAccess = () => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${authHeader()}`
  return axios.post(API_URL + 'profile')
}
const updateUser = (firstName, lastName) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${authHeader()}`
  return axios.put(API_URL + 'profile', {
    firstName,
    lastName,
  })
}
export default {
  userAccess,
  updateUser,
}
