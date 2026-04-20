import { API } from '@/api/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@/api/apiEndpoints'
import { ToasterUtil } from '@/components/common/ToasterUtil'
import { AxiosError } from 'axios'

const toast = ToasterUtil()

export type CreatePaymentPayload = {
  paidToType: 'supplier' | 'customer'
  supplierId?: string
  customerId?: string
  amount: number
  paymentMode?: 'cash' | 'upi' | 'bank' | 'other'
  note?: string
}

export const usePaymentActions = () => {
  const queryClient = useQueryClient()

  const invalidatePaymentRelatedData = () => {
    queryClient.invalidateQueries({ queryKey: ['payments'] })
    queryClient.invalidateQueries({ queryKey: ['suppliers'] })
    queryClient.invalidateQueries({ queryKey: ['customers'] })
  }

  const createPayment = useMutation({
    mutationFn: (payload: CreatePaymentPayload) =>
      API.post(API_ENDPOINTS.PAYMENT.CREATE, payload).then((res) => res.data?.data ?? res.data),

    onSuccess: () => {
      invalidatePaymentRelatedData()
      toast('Payment recorded successfully', 'success')
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        toast(error.response?.data?.message || 'Failed to record payment', 'error')
        return
      }

      toast('Failed to record payment', 'error')
    },
  })

  return {
    createPayment,
  }
}
