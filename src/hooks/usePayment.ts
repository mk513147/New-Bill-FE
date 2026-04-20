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

export type PaymentSummary = {
  totalPayments: number
  totalAmount: number
  totalFromCustomers: number
  totalToSuppliers: number
  customerPaymentsCount: number
  supplierPaymentsCount: number
  thisMonthAmount: number
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

const pickNumber = (obj: any, keys: string[]) => {
  for (const key of keys) {
    const value = obj?.[key]
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value
    }
  }
  return 0
}

const getPaymentSummary = async (): Promise<PaymentSummary> => {
  const res = await API.get(API_ENDPOINTS.PAYMENT.SUMMARY)
  const raw = res.data?.data || res.data || {}
  const customer = raw?.customer || {}
  const supplier = raw?.supplier || {}

  return {
    totalPayments: pickNumber(raw, ['totalPayments', 'count', 'totalCount', 'paymentsCount']),
    totalAmount:
      pickNumber(raw, ['totalAmount', 'amount', 'total', 'grossAmount']) ||
      pickNumber(customer, ['receivableAmount']) +
        pickNumber(customer, ['advanceAmount']) +
        pickNumber(supplier, ['payableAmount']) +
        pickNumber(supplier, ['advancePaidAmount']),
    totalFromCustomers:
      pickNumber(raw, [
        'totalFromCustomers',
        'customerAmount',
        'receivedFromCustomers',
        'customerReceived',
      ]) || pickNumber(customer, ['receivableAmount']) + pickNumber(customer, ['advanceAmount']),
    totalToSuppliers:
      pickNumber(raw, ['totalToSuppliers', 'supplierAmount', 'paidToSuppliers', 'supplierPaid']) ||
      pickNumber(supplier, ['payableAmount']) + pickNumber(supplier, ['advancePaidAmount']),
    customerPaymentsCount:
      pickNumber(raw, ['customerPaymentsCount', 'customerCount', 'fromCustomerCount']) ||
      pickNumber(customer, ['dueCount']) + pickNumber(customer, ['advanceCount']),
    supplierPaymentsCount:
      pickNumber(raw, ['supplierPaymentsCount', 'supplierCount', 'toSupplierCount']) ||
      pickNumber(supplier, ['dueCount']) + pickNumber(supplier, ['advanceCount']),
    thisMonthAmount:
      pickNumber(raw, ['thisMonthAmount', 'monthAmount', 'monthlyAmount']) ||
      Math.abs(pickNumber(raw, ['netOutstanding'])),
  }
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

export const usePaymentSummary = () => {
  return useQuery({
    queryKey: ['payment-summary'],
    queryFn: getPaymentSummary,
    retry: false,
  })
}
