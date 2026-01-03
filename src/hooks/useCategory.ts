import { useQuery } from '@tanstack/react-query'
import API_ENDPOINTS from '@/api/apiEndpoints'
import { API } from '@/api/api'

const getCategory = async () => {
  const res = await API.get(API_ENDPOINTS.CATEGORY.BASE)
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
