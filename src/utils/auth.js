//关于token操作
const tokenKey = 'adminToken'
export function getToken() {
  return localStorage.getItem(tokenKey)
}

export function setToken(token) {
  localStorage.setItem(tokenKey, token)
}

export function removeToken() {
  localStorage.removeItem(tokenKey)
}
