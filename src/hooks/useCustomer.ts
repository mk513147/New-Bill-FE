import { API } from '@/api/api'
import API_ENDPOINTS from '@/api/apiEndpoints'
import { useQuery } from '@tanstack/react-query'

/* ---------------------------------- TYPES --------------------------------- */
export type CustomerQueryParams = {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

/* ------------------------------ API FUNCTION ------------------------------- */
export const getCustomers = async (params: CustomerQueryParams = {}) => {
  const res = await API.get(API_ENDPOINTS.CUSTOMERS.BASE, {
    params,
  })

  return res.data?.data || null
}

/* ------------------------------- REACT QUERY -------------------------------- */
export const useCustomers = (params: CustomerQueryParams = {}) => {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => getCustomers(params),
    staleTime: 60 * 1000,
    retry: false,
  })
}
