const SUBSCRIPTION_INACTIVE_KEY = 'eb_subscription_inactive'
const SUBSCRIPTION_NOTICE_KEY = 'eb_subscription_notice_shown'

export const SUBSCRIPTION_ROUTE = '/subscription'
export const SUBSCRIPTION_INACTIVE_MESSAGE = 'Subscription inactive. Access denied.'

const normalizeStatus = (status?: string | null) =>
  status
    ?.trim()
    .toLowerCase()
    .replace(/[\s-]+/g, '_')

export const isInactiveSubscriptionStatus = (status?: string | null) => {
  const normalizedStatus = normalizeStatus(status)

  return [
    'inactive',
    'expired',
    'cancelled',
    'suspended',
    'past_due',
    'payment_due',
    'payment_pending',
    'trial_expired',
  ].includes(normalizedStatus || '')
}

export const hasInactiveSubscriptionFlag = () => {
  if (typeof window === 'undefined') {
    return false
  }

  return window.sessionStorage.getItem(SUBSCRIPTION_INACTIVE_KEY) === 'true'
}

export const markSubscriptionInactive = () => {
  if (typeof window === 'undefined') {
    return
  }

  window.sessionStorage.setItem(SUBSCRIPTION_INACTIVE_KEY, 'true')
}

export const clearSubscriptionInactive = () => {
  if (typeof window === 'undefined') {
    return
  }

  window.sessionStorage.removeItem(SUBSCRIPTION_INACTIVE_KEY)
  window.sessionStorage.removeItem(SUBSCRIPTION_NOTICE_KEY)
}

export const shouldNotifySubscriptionInactive = () => {
  if (typeof window === 'undefined') {
    return false
  }

  if (window.sessionStorage.getItem(SUBSCRIPTION_NOTICE_KEY) === 'true') {
    return false
  }

  window.sessionStorage.setItem(SUBSCRIPTION_NOTICE_KEY, 'true')
  return true
}

export const isSubscriptionLocked = (subscriptionStatus?: string | null) => {
  if (isInactiveSubscriptionStatus(subscriptionStatus)) {
    return true
  }

  return hasInactiveSubscriptionFlag()
}
