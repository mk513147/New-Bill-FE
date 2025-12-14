import { API } from '@/api/api.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@/api/apiEndpoints.ts'
import { ToasterUtil } from '@/components/common/ToasterUtil'

const toast = ToasterUtil()

export const useCustomerActions = (pubId: string) => {
  const queryClient = useQueryClient()

  const createCustomer = useMutation({
    mutationFn: (payload: any) =>
      API.post(API_ENDPOINTS.CUSTOMERS.CREATE, payload).then((res: any) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allCustomers'] })
      toast('Customer created successfully', 'success')
    },

    onError: () => {
      toast('Failed to create customer', 'error')
    },
  })

  const updateCustomer = useMutation({
    mutationFn: (payload: any) =>
      API.patch(`${API_ENDPOINTS.CUSTOMERS.UPDATE}/${pubId}`, payload).then((res) => res.data),

    onSuccess: (updatedCustomer) => {
      queryClient.setQueriesData({ queryKey: ['allCustomers'] }, (old: any) => {
        if (!old?.data) return old

        return {
          ...old,
          data: old.data.map((c: any) => (c._id === updatedCustomer._id ? updatedCustomer : c)),
        }
      })
      queryClient.invalidateQueries({ queryKey: ['allCustomers'] })
      toast('Customer updated successfully', 'success')
    },

    onError: () => {
      toast('Failed to update customer', 'error')
    },
  })

  const deleteCustomer = useMutation({
    mutationFn: () =>
      API.delete(`${API_ENDPOINTS.CUSTOMERS.DELETE}/${pubId}`).then((res: any) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allCustomers'] })
      toast('Customer deleted successfully', 'success')
    },

    onError: () => {
      toast('Failed to delete customer', 'error')
    },
  })

  return {
    createCustomer,
    updateCustomer,
    deleteCustomer,
  }
}
