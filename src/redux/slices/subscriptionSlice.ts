import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SubscriptionLimits {
  maxProducts: number // -1 = unlimited
  maxCustomers: number
  maxStaff: number
  maxCategories: number
  maxSuppliers: number
}

export interface SubscriptionFeatures {
  exportImport: boolean
  advancedReports: boolean
  apiAccess: boolean
  prioritySupport: boolean
  customBranding: boolean
}

export interface CurrentPlan {
  id: string
  name: string
  description: string
  price: {
    monthly: number
    yearly: number
    currency: string
  }
}

export interface ShopInfo {
  shopName: string
  emailId: string
  mobileNumber: string
}

export interface SubscriptionData {
  currentPlan: CurrentPlan
  subscriptionStatus: 'active' | 'expired' | 'cancelled' | 'free_trial'
  isTrialActive: boolean
  isSubscriptionActive: boolean
  needsRenewal: boolean
  daysRemaining: number
  expiryDate: string | null
  trialStartDate: string | null
  trialEndDate: string | null
  autoRenew: boolean
  limits: SubscriptionLimits
  features: SubscriptionFeatures
  shopInfo: ShopInfo
}

interface SubscriptionState {
  subscription: SubscriptionData | null
  loading: boolean
  error: string | null
}

const initialState: SubscriptionState = {
  subscription: null,
  loading: false,
  error: null,
}

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setSubscription: (state, action: PayloadAction<SubscriptionData>) => {
      state.subscription = action.payload
      state.loading = false
      state.error = null
    },

    setSubscriptionLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },

    setSubscriptionError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },

    resetSubscription: (state) => {
      state.subscription = null
      state.loading = false
      state.error = null
    },
  },
})

export const { setSubscription, setSubscriptionLoading, setSubscriptionError, resetSubscription } =
  subscriptionSlice.actions

export default subscriptionSlice.reducer
