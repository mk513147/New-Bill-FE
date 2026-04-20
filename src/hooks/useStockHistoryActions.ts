import { API } from '@/api/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@/api/apiEndpoints'
import { ToasterUtil } from '@/components/common/ToasterUtil'
import { AxiosError } from 'axios'

const toast = ToasterUtil()

export type StockAdjustmentPayload = {
  productId: string
  quantity: number
  type: 'IN' | 'OUT'
  note?: string
}

export const useStockHistoryActions = () => {
  const queryClient = useQueryClient()

  const invalidateStock = () => {
    queryClient.invalidateQueries({ queryKey: ['stock-history'] })
    queryClient.invalidateQueries({ queryKey: ['products'] })
  }

  const createManualAdjustment = useMutation({
    mutationFn: (payload: StockAdjustmentPayload) =>
      API.post(API_ENDPOINTS.STOCK_HISTORY.ADJUST, payload).then(
        (res) => res.data?.data ?? res.data,
      ),

    onSuccess: () => {
      invalidateStock()
      toast('Stock adjusted successfully', 'success')
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        toast(error.response?.data?.message || 'Failed to adjust stock', 'error')
        return
      }
      toast('Failed to adjust stock', 'error')
    },
  })

  return {
    createManualAdjustment,
  }
}
