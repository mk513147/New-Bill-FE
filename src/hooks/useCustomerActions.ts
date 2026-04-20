import { API } from '@/api/api.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@/api/apiEndpoints.ts'
import { ToasterUtil } from '@/components/common/ToasterUtil'
import { AxiosError } from 'axios'

const toast = ToasterUtil()

export type CustomerPayload = {
  name: string
  mobileNumber: string
  email?: string
  address?: string
  balance?: number
}

export const useCustomerActions = () => {
  const queryClient = useQueryClient()

  const invalidateCustomers = () => {
    queryClient.invalidateQueries({ queryKey: ['customers'] })
  }

  const createCustomer = useMutation({
    mutationFn: (payload: CustomerPayload) =>
      API.post(API_ENDPOINTS.CUSTOMERS.CREATE, payload).then((res) => res.data?.data ?? res.data),

    onSuccess: () => {
      invalidateCustomers()
      toast('Customer created successfully', 'success')
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        toast(error.response?.data?.message || 'Failed to create customer', 'error')
        return
      }

      toast('Failed to create customer', 'error')
    },
  })

  const updateCustomer = useMutation({
    mutationFn: ({ customerId, payload }: { customerId: string; payload: CustomerPayload }) =>
      API.patch(`${API_ENDPOINTS.CUSTOMERS.UPDATE}/${customerId}`, payload).then(
        (res) => res.data?.data ?? res.data,
      ),

    onSuccess: () => {
      invalidateCustomers()
      toast('Customer updated successfully', 'success')
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        toast(error.response?.data?.message || 'Failed to update customer', 'error')
        return
      }

      toast('Failed to update customer', 'error')
    },
  })

  const deleteCustomer = useMutation({
    mutationFn: (customerId: string) =>
      API.delete(`${API_ENDPOINTS.CUSTOMERS.DELETE}/${customerId}`).then((res) => res.data),

    onSuccess: () => {
      invalidateCustomers()
      toast('Customer deleted successfully', 'success')
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        toast(error.response?.data?.message || 'Failed to delete customer', 'error')
        return
      }

      toast('Failed to delete customer', 'error')
    },
  })

  return {
    createCustomer,
    updateCustomer,
    deleteCustomer,
  }
}
