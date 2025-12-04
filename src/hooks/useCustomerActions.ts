import { API } from '@/api/api.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@/api/apiEndpoints.ts'

export const useCustomerActions = (pubId: string) => {
  const queryClient = useQueryClient()

  const createCustomer = useMutation({
    mutationFn: (payload: any) =>
      API.post(API_ENDPOINTS.CUSTOMERS.CREATE, payload).then((res: any) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    },
  })

  const updateCustomer = useMutation({
    mutationFn: (payload: any) =>
      API.patch(`${API_ENDPOINTS.CUSTOMERS.UPDATE}/${pubId}`, payload).then((res: any) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers', pubId] })
    },
  })

  const deleteCustomer = useMutation({
    mutationFn: () =>
      API.delete(`${API_ENDPOINTS.CUSTOMERS.DELETE}${pubId}`).then((res: any) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    },
  })

  return {
    createCustomer,
    updateCustomer,
    deleteCustomer,
  }
}
