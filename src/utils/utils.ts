import { API } from '@/api/api'
import API_ENDPOINTS from '@/api/apiEndpoints'
import { clearAuthSession } from './authSession'

let logoutPromise: Promise<void> | null = null

export const logoutService = async () => {
  if (logoutPromise) {
    return logoutPromise
  }

  logoutPromise = (async () => {
    try {
      await API.post(API_ENDPOINTS.AUTH.LOGOUT).catch(() => undefined)
    } finally {
      clearAuthSession()
    }
  })()

  try {
    await logoutPromise
  } finally {
    logoutPromise = null
  }
}
