import { API } from '@/api/api'
import API_ENDPOINTS from '@/api/apiEndpoints'
import { useQuery } from '@tanstack/react-query'
import { isFrontendPagination } from '@/utils/isFrontendPagination'

export type BillRecord = {
  _id: string
  billNumber: string
  supplier?: { _id: string; name: string }
  supplierId?: string
  poNumber: string
  billDate: string
  dueDate: string
  amount: number
  status: 'Unpaid' | 'Paid' | 'Overdue'
  createdAt?: string
  updatedAt?: string
}

export type BillQueryParams = {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export const getBills = async (params: BillQueryParams = {}) => {
  const res = await API.get(API_ENDPOINTS.BILL.BASE, { params })
  return res.data?.data || null
}

export const useBills = (params: BillQueryParams = {}) => {
  return useQuery({
    queryKey: [
      'bills',
      {
        search: params.search,
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
        page: params.page,
        limit: params.limit,
      },
    ],
    queryFn: () => getBills(params),
    retry: false,
  })
}
