import API_ENDPOINTS from '@/api/apiEndpoints.ts'
import { API } from '@/api/api.ts'
import { useQuery } from '@tanstack/react-query'

export const getCustomer = async () => {
  const res = await API.get(API_ENDPOINTS.CUSTOMERS.BASE)
  return res.data?.data || null
}

export const useCustomer = () => {
  return useQuery({
    queryKey: ['getCustomer'],
    queryFn: getCustomer,
    retry: false,
    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}
