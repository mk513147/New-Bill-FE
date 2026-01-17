import { API } from '@/api/api'
import API_ENDPOINTS from '@/api/apiEndpoints'
import { useQuery } from '@tanstack/react-query'
import { isFrontendPagination } from '@/utils/isFrontendPagination'

export type CategoryQueryParams = {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export const getCategories = async (params: CategoryQueryParams = {}) => {
  const frontend = isFrontendPagination(params.sortBy, params.sortOrder)

  const endpoint = frontend ? API_ENDPOINTS.CATEGORY.SEARCH : API_ENDPOINTS.CATEGORY.BASE

  const res = await API.get(endpoint, { params })

  return res.data?.data || null
}

export const useCategory = (params: CategoryQueryParams = {}) => {
  const frontend = isFrontendPagination(params.sortBy, params.sortOrder)

  return useQuery({
    queryKey: [
      'categories',
      {
        search: params.search,
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
        mode: frontend ? 'frontend' : 'backend',
        page: frontend ? undefined : params.page,
        limit: frontend ? undefined : params.limit,
      },
    ],
    queryFn: () => getCategories(params),
    staleTime: 60 * 1000,
    retry: false,
  })
}
