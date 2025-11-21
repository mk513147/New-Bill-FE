import API_ENDPOINTS from '@/Api/apiEndpoints'
import { API } from '@/Api/api'
import { useQuery } from '@tanstack/react-query'

export const getProducts = async () => {
  const res = await API.get(API_ENDPOINTS.PRODUCTS.BASE)
  return res.data?.data || null
}

export const useProducts = () => {
  return useQuery({
    queryKey: ['getProducts'],
    queryFn: getProducts,
    retry: false,
    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}
