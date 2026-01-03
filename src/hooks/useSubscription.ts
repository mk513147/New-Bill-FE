import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { API } from '@/api/api'
import API_ENDPOINTS from '@/api/apiEndpoints'
import {
  setSubscription,
  setSubscriptionLoading,
  setSubscriptionError,
  SubscriptionData,
} from '@/redux/slices/subscriptionSlice'
import { ToasterUtil } from '@/components/common/ToasterUtil'

export const useSubscription = () => {
  const dispatch = useDispatch()
  const toast = ToasterUtil()
  const subscription: any = useSelector((state: RootState) => state.subscription.subscription)
  const loading = useSelector((state: RootState) => state.subscription.loading)

  // Fetch subscription status from API
  const fetchSubscriptionStatus = async () => {
    dispatch(setSubscriptionLoading(true))
    try {
      const response = await API.get(API_ENDPOINTS.SUBSCRIPTION.STATUS)

      if (response.status === 200) {
        const subData: SubscriptionData = response.data.data
        dispatch(setSubscription(subData))
        return subData
      }
    } catch (error: any) {
      console.error('Failed to fetch subscription:', error)
      const errorMsg = error?.response?.data?.message || 'Failed to load subscription'
      dispatch(setSubscriptionError(errorMsg))
      return null
    }
  }

  // Check if user can create more of a resource (no usage tracking from backend yet)
  const checkLimit = (
    resource: 'products' | 'customers' | 'staff' | 'categories' | 'suppliers',
  ): boolean => {
    if (!subscription) return false

    const resourceKey =
      `max${resource.charAt(0).toUpperCase() + resource.slice(1)}` as keyof typeof subscription.limits
    const limit = subscription.limits[resourceKey] as number

    // -1 means unlimited
    if (limit === -1) return true

    // TODO: Track actual usage from backend
    return true
  }

  // Check if plan has a specific feature
  const hasFeature = (feature: keyof typeof subscription.features): boolean => {
    if (!subscription) return false
    return subscription.features[feature]
  }

  // Get days remaining in subscription/trial
  const getDaysRemaining = (): number => {
    if (!subscription) return 0
    return subscription.daysRemaining
  }

  // Check if subscription is active
  const isSubscriptionActive = (): boolean => {
    if (!subscription) return false
    return subscription.isSubscriptionActive
  }

  // Get usage percentage for a resource (not available from backend yet)
  const getUsagePercentage = (
    resource: 'products' | 'customers' | 'staff' | 'categories' | 'suppliers',
  ): number => {
    // TODO: Implement when backend provides usage data
    return 0
  }

  return {
    subscription,
    loading,
    fetchSubscriptionStatus,
    checkLimit,
    hasFeature,
    getDaysRemaining,
    isSubscriptionActive,
    getUsagePercentage,
  }
}
