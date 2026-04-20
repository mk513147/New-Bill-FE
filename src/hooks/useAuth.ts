import { API } from '@/api/api.ts'
import API_ENDPOINTS from '@/api/apiEndpoints.ts'
import { logoutService } from '@/utils/utils'

export const useAuth = () => {
  const login = async (payload: any) => {
    const { data } = await API.post(API_ENDPOINTS.AUTH.LOGIN, payload)
    return data
  }

  const logout = async () => {
    await logoutService()
  }

  return {
    login,
    logout,
  }
}
