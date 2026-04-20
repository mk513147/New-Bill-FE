import { API } from '@/api/api.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@/api/apiEndpoints.ts'
import { ToasterUtil } from '@/components/common/ToasterUtil'
import { AxiosError } from 'axios'

const toast = ToasterUtil()

export type BillPayload = {
  billNumber: string
  supplierId: string
  poNumber?: string
  billDate?: string
  dueDate?: string
  amount: number
  status?: 'Unpaid' | 'Paid' | 'Overdue'
}

export const useBillActions = () => {
  const queryClient = useQueryClient()

  const invalidateBills = () => {
    queryClient.invalidateQueries({ queryKey: ['bills'] })
  }

  const createBill = useMutation({
    mutationFn: (payload: BillPayload) =>
      API.post(API_ENDPOINTS.BILL.CREATE, payload).then((res) => res.data?.data ?? res.data),

    onSuccess: () => {
      invalidateBills()
      toast('Bill created successfully', 'success')
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        toast(error.response?.data?.message || 'Failed to create bill', 'error')
        return
      }
      toast('Failed to create bill', 'error')
    },
  })

  const updateBill = useMutation({
    mutationFn: ({ billId, payload }: { billId: string; payload: BillPayload }) =>
      API.patch(`${API_ENDPOINTS.BILL.UPDATE}/${billId}`, payload).then(
        (res) => res.data?.data ?? res.data,
      ),

    onSuccess: () => {
      invalidateBills()
      toast('Bill updated successfully', 'success')
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        toast(error.response?.data?.message || 'Failed to update bill', 'error')
        return
      }
      toast('Failed to update bill', 'error')
    },
  })

  const deleteBill = useMutation({
    mutationFn: (billId: string) =>
      API.delete(`${API_ENDPOINTS.BILL.DELETE}/${billId}`).then(
        (res) => res.data?.data ?? res.data,
      ),

    onSuccess: () => {
      invalidateBills()
      toast('Bill deleted successfully', 'success')
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        toast(error.response?.data?.message || 'Failed to delete bill', 'error')
        return
      }
      toast('Failed to delete bill', 'error')
    },
  })

  return { createBill, updateBill, deleteBill }
}
