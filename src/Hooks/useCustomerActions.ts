import { API } from '@/api/api.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCustomerActions = (pubId: string) => {
  const queryClient = useQueryClient()

  const createCustomer = useMutation({
    mutationFn: (payload: any) => API.post('/customers', payload).then((res: any) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    },
  })

  const updateCustomer = useMutation({
    mutationFn: (payload: any) =>
      API.put(`/customers/${pubId}`, payload).then((res: any) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers', pubId] })
    },
  })

  const deleteCustomer = useMutation({
    mutationFn: () => API.delete(`/customers/${pubId}`).then((res: any) => res.data),

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
