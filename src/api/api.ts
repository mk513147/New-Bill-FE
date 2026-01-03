import { resetProfile } from '@/redux/slices/profileSlice'
import { resetSubscription } from '@/redux/slices/subscriptionSlice'
import { store } from '@/redux/store'
import { logoutService } from '@/utils/utils'
import { ToasterUtil } from '@/components/common/ToasterUtil'

import axios from 'axios'
import API_ENDPOINTS from './apiEndpoints'

const toast = ToasterUtil()

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
    const errorCode = error?.response?.data?.data?.code
    const errorMessage = error?.response?.data?.data?.message

    const currentPath = window.location.pathname

    if (currentPath === '/login') {
      return Promise.reject(error)
    }

    // Handle 403 Forbidden - Subscription related errors
    if (status === 402) {
      console.log('⛔ Forbidden — checking subscription error')

      // Limit reached error
      if (errorCode === 'LIMIT_REACHED') {
        toast(
          errorMessage || 'You have reached your plan limit. Please upgrade your plan.',
          'error',
        )
        return Promise.reject(error)
      }

      // Feature not available in current plan
      if (errorCode === 'FEATURE_NOT_AVAILABLE') {
        toast(errorMessage || 'This feature is not available in your current plan.', 'error')
        return Promise.reject(error)
      }

      // Subscription expired
      if (errorCode === 'SUBSCRIPTION_EXPIRED' || errorCode === 'NO_ACTIVE_SUBSCRIPTION') {
        toast('Your subscription has expired. Please contact admin.', 'error')
        setTimeout(() => {
          window.location.href = '/pricing'
        }, 1000)
        return Promise.reject(error)
      }

      // Generic 403 error
      toast('Access denied. Please check your subscription.', 'error')
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
      store.dispatch(resetSubscription())
      toast('Session expired', 'error')

      window.location.href = '/login'

      return Promise.reject(error)
    }

    if (!error.response) {
      console.error('Network error — offline?')
      toast('You are offline', 'error')
    }

    return Promise.reject(error)
  },
)
