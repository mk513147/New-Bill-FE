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

      const res = await API.post(API_ENDPOINTS.PRODUCTS.IMPORT, formData)
      return res.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast('Products imported successfully', 'success')
    },

    onError: () => {
      toast('Product import failed', 'error')
    },
  })
}
