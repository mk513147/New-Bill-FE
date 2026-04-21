import { API } from '@/api/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@/api/apiEndpoints'
import { ToasterUtil } from '@/components/common/ToasterUtil'

const toast = ToasterUtil()

export const useProductImport = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append('file', file)

      const res = await API.post(API_ENDPOINTS.PRODUCTS.IMPORT, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return res.data
    },

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast(response?.message || 'Products imported successfully', 'success')
    },

    onError: (error: any) => {
      toast(error?.response?.data?.message || 'Product import failed', 'error')
    },
  })
}
