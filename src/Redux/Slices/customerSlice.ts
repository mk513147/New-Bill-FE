import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CustomerData {
  _id: string
  name: string
  email: string
  phone: string
  address?: string
}

interface CustomerState {
  customer: CustomerData | null
}

const initialState: CustomerState = {
  customer: null,
}

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomer: (state, action: PayloadAction<CustomerData>) => {
      state.customer = action.payload
    },

    updateCustomer: (state, action: PayloadAction<Partial<Omit<CustomerData, '_id'>>>) => {
      if (!state.customer) return
      state.customer = { ...state.customer, ...action.payload }
    },

    resetCustomer: (state) => {
      state.customer = null
    },
  },
})

export const { setCustomer, updateCustomer, resetCustomer } = customerSlice.actions

export default customerSlice.reducer
