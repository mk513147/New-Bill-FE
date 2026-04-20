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
  partyName?: string
  invoiceNumber?: string
  billNumber?: string
  saleId?: {
    _id: string
    invoiceNumber?: string
  } | null
  purchaseId?: {
    _id: string
    invoiceNumber?: string
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

export type PartyDueRow = {
  paidToType: 'supplier' | 'customer'
  partyType: 'registered' | 'anonymous'
  partyId?: string
  partyName: string
  mobileNumber?: string
  totalDue: number
  totalAmount?: number
  totalPaid?: number
  transactionCount?: number
  lastTransactionDate?: string
}

export type PaymentDuesResponse = {
  customers: PartyDueRow[]
  suppliers: PartyDueRow[]
}

const getPaymentDues = async (): Promise<PaymentDuesResponse> => {
  const res = await API.get(API_ENDPOINTS.PAYMENT.DUES)
  return (
    res.data?.data || {
      customers: [],
      suppliers: [],
    }
  )
}

export const usePayment = () => {
  return useQuery({
    queryKey: ['payments'],
    queryFn: getPayments,

    retry: false,
  })
}

export const usePaymentDues = () => {
  return useQuery({
    queryKey: ['payment-dues'],
    queryFn: getPaymentDues,
    retry: false,
  })
}
