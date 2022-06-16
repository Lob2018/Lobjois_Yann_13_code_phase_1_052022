export default function authHeader() {
  const user =
    JSON.parse(localStorage.getItem('argentbank-user')) ||
    JSON.parse(sessionStorage.getItem('argentbank-user'))
  if (user) {
    return user
  } else {
    return null
  }
}
