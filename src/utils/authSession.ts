const AUTH_STORAGE_KEY = 'eb_logged_in'

export const isAuthenticated = () => {
  if (typeof window === 'undefined') {
    return false
  }

  return window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true'
}

export const setAuthenticated = (value: boolean) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, String(value))
}

export const clearAuthSession = () => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.clear()
  window.sessionStorage.clear()
  window.localStorage.setItem(AUTH_STORAGE_KEY, 'false')
}
