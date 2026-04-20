import { API } from '@/api/api'
import API_ENDPOINTS from '@/api/apiEndpoints'
import { useQuery } from '@tanstack/react-query'

export type PurchaseItem = {
  productId: {
    _id: string
    name: string
    unit?: string
  } | null
  quantity: number
  price: number
}

export type PurchaseRecord = {
  _id: string
  invoiceNumber: string
  purchaseDate: string
  supplierId: {
    _id: string
    name: string
    mobileNumber?: string
    pendingAmount?: number
  } | null
  items: PurchaseItem[]
  totalAmount: number
  paidAmount: number
  dueAmount: number
  paymentStatus: 'pending' | 'partial' | 'paid' | 'advance'
  note?: string
  createdAt?: string
  updatedAt?: string
}

const getPurchases = async (): Promise<PurchaseRecord[]> => {
  const res = await API.get(API_ENDPOINTS.PURCHASE.BASE)
  return res.data?.data || []
}

export const usePurchase = () => {
  return useQuery({
    queryKey: ['purchases'],
    queryFn: getPurchases,

    retry: false,
  })
}
