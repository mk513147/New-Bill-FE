import { API } from '@/api/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@/api/apiEndpoints'
import { ToasterUtil } from '@/components/common/ToasterUtil'

const toast = ToasterUtil()

export const useProductActions = (pubId: string) => {
  const queryClient = useQueryClient()

  const createProduct = useMutation({
    mutationFn: (payload: any) =>
      API.post(API_ENDPOINTS.PRODUCTS.CREATE, payload).then((res: any) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allProducts'] })
      toast('Product created successfully', 'success')
    },

    onError: () => {
      toast('Failed to create product', 'error')
    },
  })

  const updateProduct = useMutation({
    mutationFn: (payload: any) =>
      API.patch(`${API_ENDPOINTS.PRODUCTS.UPDATE}/${pubId}`, payload).then((res: any) => res.data),

    onSuccess: (updatedProduct) => {
      queryClient.setQueriesData({ queryKey: ['allProducts'] }, (old: any) => {
        if (!old?.data) return old

        return {
          ...old,
          data: old.data.map((p: any) => (p._id === updatedProduct._id ? updatedProduct : p)),
        }
      })

      queryClient.invalidateQueries({ queryKey: ['allProducts'] })
      toast('Product updated successfully', 'success')
    },

    onError: () => {
      toast('Failed to update product', 'error')
    },
  })

  const deleteProduct = useMutation({
    mutationFn: () =>
      API.delete(`${API_ENDPOINTS.PRODUCTS.DELETE}/${pubId}`).then((res: any) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allProducts'] })
      toast('Product deleted successfully', 'success')
    },

    onError: () => {
      toast('Failed to delete product', 'error')
    },
  })

  return {
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
