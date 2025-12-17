import API_ENDPOINTS from '@/api/apiEndpoints'
import { API } from '@/api/api'
import { useQuery } from '@tanstack/react-query'

export const getProduct = async () => {
  const res = await API.get(API_ENDPOINTS.PRODUCTS.BASE)
  return res.data?.data || null
}

export const getAllProducts = async (limit = 20, page = 1) => {
  const res = await API.get(API_ENDPOINTS.PRODUCTS.BASE, {
    params: { limit, page },
  })

  return res.data?.data || null
}

export const useProduct = () => {
  return useQuery({
    queryKey: ['getProduct'],
    queryFn: getProduct,
    retry: false,
    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}

export const useAllProducts = (limit = 20, page = 1) => {
  return useQuery({
    queryKey: ['allProducts', limit, page],
    queryFn: () => getAllProducts(limit, page),
    retry: false,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: true,
  })
}
