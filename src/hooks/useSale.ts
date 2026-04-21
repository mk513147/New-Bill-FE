import { API } from '@/api/api'
import API_ENDPOINTS from '@/api/apiEndpoints'
import { useQuery } from '@tanstack/react-query'

export type SaleItem = {
  productId: {
    _id: string
    name: string
    unit?: string
  } | null
  quantity: number
  price: number
  discount: number
  gst?: number
}

export type SaleRecord = {
  _id: string
  invoiceNumber: string
  saleDate: string
  customerId: {
    _id: string
    name: string
    mobileNumber?: string
  } | null
  customerName: string
  items: SaleItem[]
  totalAmount: number
  paidAmount: number
  dueAmount: number
  paymentStatus: 'pending' | 'partial' | 'paid' | 'advance'
  note?: string
  createdAt?: string
  updatedAt?: string
}

const getSales = async (): Promise<SaleRecord[]> => {
  const res = await API.get(API_ENDPOINTS.SALE.BASE)
  return res.data?.data || []
}

export const useSales = () => {
  return useQuery({
    queryKey: ['sales'],
    queryFn: getSales,
    retry: false,
  })
}
