import { API } from '@/api/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useProductActions = (pubId: string) => {
  const queryClient = useQueryClient()

  const createProduct = useMutation({
    mutationFn: (payload: any) => API.post('/products', payload).then((res: any) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  const updateProduct = useMutation({
    mutationFn: (payload: any) =>
      API.put(`/products/${pubId}`, payload).then((res: any) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', pubId] })
    },
  })

  const deleteProduct = useMutation({
    mutationFn: () => API.delete(`/products/${pubId}`).then((res: any) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  return {
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
