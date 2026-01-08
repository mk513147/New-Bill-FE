import { useQuery } from '@tanstack/react-query'
import API_ENDPOINTS from '@/api/apiEndpoints'
import { API } from '@/api/api'

const getCategory = async () => {
  const res = await API.get(API_ENDPOINTS.CATEGORY.BASE)
  return res.data?.data || null
}

export const getAllCategories = async (limit = 20, page = 1) => {
  const res = await API.get(API_ENDPOINTS.CATEGORY.BASE, {
    params: { limit, page },
  })

  return res.data?.data || null
}

export const useCategory = () => {
  return useQuery({
    queryKey: ['getCategory'],
    queryFn: getCategory,
    retry: false,
    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}

export const useAllCategories = (limit = 20, page = 1) => {
  return useQuery({
    queryKey: ['allCategories', limit, page],
    queryFn: () => getAllCategories(limit, page),
    retry: false,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: true,
  })
}
