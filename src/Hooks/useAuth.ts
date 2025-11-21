import { API } from '@/Api/api'
import API_ENDPOINTS from '@/Api/apiEndpoints'

let isLoggingOut = false

export const useAuth = () => {
  const login = async (payload: any) => {
    const { data } = await API.post(API_ENDPOINTS.AUTH.LOGIN, payload)
    return data
  }

  const logout = async () => {
    if (isLoggingOut) return
    isLoggingOut = true

    try {
      await API.post(API_ENDPOINTS.AUTH.LOGOUT).catch(() => {})
    } finally {
      localStorage.clear()
      sessionStorage.clear()
    }
  }

  return {
    login,
    logout,
  }
}
