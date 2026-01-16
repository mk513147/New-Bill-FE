import { API } from '@/api/api'
import API_ENDPOINTS from '@/api/apiEndpoints'
import { useQuery } from '@tanstack/react-query'
import { isFrontendPagination } from '@/utils/isFrontendPagination'

export type CustomerQueryParams = {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export const getCustomers = async (params: CustomerQueryParams = {}) => {
  const frontend = isFrontendPagination(params.sortBy, params.sortOrder)

  const endpoint = frontend ? API_ENDPOINTS.CUSTOMERS.SEARCH : API_ENDPOINTS.CUSTOMERS.BASE

  const res = await API.get(endpoint, { params })

  return res.data?.data || null
}

export const useCustomers = (params: CustomerQueryParams = {}) => {
  const frontend = isFrontendPagination(params.sortBy, params.sortOrder)

  return useQuery({
    queryKey: [
      'customers',
      {
        search: params.search,
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
        mode: frontend ? 'frontend' : 'backend',
        page: frontend ? undefined : params.page,
        limit: frontend ? undefined : params.limit,
      },
    ],
    queryFn: () => getCustomers(params),
    staleTime: 60 * 1000,
    retry: false,
  })
}
