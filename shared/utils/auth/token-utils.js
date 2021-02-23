import Cookies from 'js-cookie'

const TokenKey = '07115aae-0c08-4b08-a03a-c45b49895214'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
