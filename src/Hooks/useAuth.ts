import { API } from '@/api/api.ts'
import API_ENDPOINTS from '@/api/apiEndpoints.ts'

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
