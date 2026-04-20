import { API } from '@/api/api'
import API_ENDPOINTS from '@/api/apiEndpoints'
import { useQuery } from '@tanstack/react-query'

export type StockHistoryQueryParams = {
  productId?: string
  source?: 'purchase' | 'sale' | 'adjustment' | 'damage'
  type?: 'IN' | 'OUT'
  startDate?: string
  endDate?: string
}

export type StockHistoryRecord = {
  _id: string
  productId: {
    _id: string
    name: string
  } | null
  quantity: number
  type: 'IN' | 'OUT'
  source: 'purchase' | 'sale' | 'adjustment' | 'damage'
  referenceId?: string
  note?: string
  createdAt?: string
  updatedAt?: string
}

const getStockHistory = async (
  params: StockHistoryQueryParams = {},
): Promise<StockHistoryRecord[]> => {
  const res = await API.get(API_ENDPOINTS.STOCK_HISTORY.BASE, { params })
  return res.data?.data || []
}

export const getStockHistoryByProduct = async (
  productId: string,
): Promise<StockHistoryRecord[]> => {
  const res = await API.get(`${API_ENDPOINTS.STOCK_HISTORY.PRODUCT}/${productId}`)
  return res.data?.data || []
}

export const useStockHistory = (params: StockHistoryQueryParams = {}) => {
  return useQuery({
    queryKey: ['stock-history', params],
    queryFn: () => getStockHistory(params),

    retry: false,
  })
}
