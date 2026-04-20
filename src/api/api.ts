import { resetProfile } from '@/redux/slices/profileSlice'
import { store } from '@/redux/store'
import { logoutService } from '@/utils/utils'
import { isAuthenticated } from '@/utils/authSession'
import { ToasterUtil } from '@/components/common/ToasterUtil'
import {
  markSubscriptionInactive,
  shouldNotifySubscriptionInactive,
  SUBSCRIPTION_INACTIVE_MESSAGE,
  SUBSCRIPTION_ROUTE,
} from '@/utils/subscriptionAccess'

import axios from 'axios'
import API_ENDPOINTS from './apiEndpoints'

const toast = ToasterUtil()

const isAuthRoute = (url?: string) => {
  if (!url) {
    return false
  }

  return [API_ENDPOINTS.AUTH.LOGIN, API_ENDPOINTS.AUTH.LOGOUT].some((path) => url.includes(path))
}

const shouldForceLogout = (error: any) => {
  const status = error?.response?.status
  const message = error?.response?.data?.message

  return status === 401 || message === 'Unauthorized: Access'
}

const isSubscriptionInactiveError = (error: any) => {
  const message = error?.response?.data?.message

  return message === SUBSCRIPTION_INACTIVE_MESSAGE
}

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
    const requestUrl = error?.config?.url
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''

    if (isAuthRoute(requestUrl)) {
      return Promise.reject(error)
    }

    if (
      isSubscriptionInactiveError(error) &&
      !requestUrl?.includes(API_ENDPOINTS.AUTH.SUBSCRIPTION)
    ) {
      markSubscriptionInactive()

      if (shouldNotifySubscriptionInactive()) {
        toast('Subscription inactive. Choose a plan to continue.', 'warning')
      }

      if (currentPath !== SUBSCRIPTION_ROUTE && currentPath !== '/login') {
        window.location.replace(SUBSCRIPTION_ROUTE)
      }

      return Promise.reject(error)
    }

    if (shouldForceLogout(error) && isAuthenticated()) {
      console.warn('Unauthorized response received, clearing client session')

      await logoutService()

      store.dispatch(resetProfile())
      toast('Session expired', 'error')

      if (currentPath !== '/login') {
        window.location.replace('/login')
      }

      return Promise.reject(error)
    }

    if (!error.response) {
      console.error('Network error — offline?')
      toast('You are offline', 'error')
    }

    return Promise.reject(error)
  },
)
