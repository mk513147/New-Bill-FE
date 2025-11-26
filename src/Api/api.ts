import { resetProfile } from '@/Redux/slices/profileSlice'
import { store } from '@/Redux/store'
import { logoutService } from '@/utils/utils'

import axios from 'axios'
import API_ENDPOINTS from './apiEndpoints'

export const API = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,

  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

API.interceptors.response.use(
  (response) => response,

  async (error) => {
    const status = error?.response?.status
    const currentPath = window.location.pathname

    if (currentPath === '/login') {
      return Promise.reject(error)
    }

    if (status === 401) {
      console.log('⛔ Unauthorized — clearing session')

      if (error.config?.url?.includes(API_ENDPOINTS.AUTH.LOGOUT)) {
        console.warn('Logout API returned 401 — ignoring')
        return Promise.reject(error)
      }

      await logoutService()

      store.dispatch(resetProfile())

      window.location.href = '/login'

      return Promise.reject(error)
    }

    if (!error.response) {
      console.error('Network error — offline?')
    }

    return Promise.reject(error)
  },
)
