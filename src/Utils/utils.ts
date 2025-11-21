import { API } from '@/Api/api'
import API_ENDPOINTS from '@/Api/apiEndpoints'

let isLoggingOut = false

export const logoutService = async () => {
  if (isLoggingOut) return
  isLoggingOut = true

  try {
    await API.post(API_ENDPOINTS.AUTH.LOGOUT).catch(() => {})
  } finally {
    localStorage.clear()
    sessionStorage.clear()
  }
}
