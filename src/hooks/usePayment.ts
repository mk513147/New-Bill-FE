import { API } from '@/api/api'
import API_ENDPOINTS from '@/api/apiEndpoints'
import { useQuery } from '@tanstack/react-query'

export type PaymentRecord = {
  _id: string
  paidToType: 'supplier' | 'customer'
  supplierId?: {
    _id: string
    name: string
    mobileNumber?: string
    pendingAmount?: number
  } | null
  customerId?: {
    _id: string
    name: string
    mobileNumber?: string
  } | null
  amount: number
  paymentMode: 'cash' | 'upi' | 'bank' | 'other'
  note?: string
  paymentDate?: string
  createdAt?: string
  updatedAt?: string
}

const getPayments = async (): Promise<PaymentRecord[]> => {
  const res = await API.get(API_ENDPOINTS.PAYMENT.BASE)
  return res.data?.data || []
}

export const usePayment = () => {
  return useQuery({
    queryKey: ['payments'],
    queryFn: getPayments,

    retry: false,
  })
}
