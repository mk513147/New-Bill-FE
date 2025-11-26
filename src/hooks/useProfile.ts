import { useQuery } from '@tanstack/react-query'
import { API } from '@/api/api'
import API_ENDPOINTS from '@/api/apiEndpoints'

export const getProfile = async () => {
  const res = await API.get(API_ENDPOINTS.MERCHANT.PROFILE)
  return res?.data?.data || null
}

export const useProfile = () => {
  return useQuery({
    queryKey: ['getProfile'],
    queryFn: getProfile,
    retry: false,

    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}
