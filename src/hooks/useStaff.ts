import { useQuery } from '@tanstack/react-query'
import { API } from '@/api/api'
import API_ENDPOINTS from '@/api/apiEndpoints'

export const getStaffList = async () => {
  const res = await API.get(API_ENDPOINTS.STAFF.BASE)
  return res?.data?.data || null
}

export const useStaff = () => {
  return useQuery({
    queryKey: ['getStaffList'],
    queryFn: getStaffList,
    retry: false,

    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}
